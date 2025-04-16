use crate::vendors::vendors_data::VendorData;
use anyhow::Result;
use database_common_lib::database_connection::{create_pool, DatabaseConnectionData};
use futures::future;
use log::debug;
use sqlx::{Executor, MySqlPool};

pub async fn initialize_database(pool: &MySqlPool) -> Result<()> {
    debug!("Initializing vendors database");
    pool.execute(
        r#"
		create table if not exists vendors (
			id INT UNSIGNED NOT NULL AUTO_INCREMENT,
			name VARCHAR(255) NOT NULL,
			address TEXT NOT NULL,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		)
	"#,
    )
    .await?;
    Ok(())
}

pub async fn get_vendors(data: &DatabaseConnectionData) -> Result<Vec<VendorData>> {
    let pool = create_pool(data).await?;

    // Using query_as with the FromRow implementation
    let vendors = sqlx::query_as::<_, VendorData>("SELECT id, name, address FROM vendors")
        .fetch_all(&pool)
        .await?;

    // For each vendor, we'll need to fetch their contacts
    let vendors_with_contacts = future::join_all(vendors.into_iter().map(|mut vendor| async {
        let pool = create_pool(data).await.unwrap();
        let contacts: Vec<u64> =
            sqlx::query_as::<_, (u64,)>("SELECT id FROM contacts WHERE vendor_id = ?")
                .bind(vendor.id)
                .fetch_all(&pool)
                .await
                .unwrap_or_default()
                .into_iter()
                .map(|(id,)| id)
                .collect();

        vendor.contacts = contacts;
        vendor
    }))
    .await;

    Ok(vendors_with_contacts)
}

pub async fn get_vendor_by_id(
    id: u64,
    data: &DatabaseConnectionData,
) -> Result<Option<VendorData>> {
    let pool = create_pool(data).await?;

    // Using query_as with the FromRow implementation
    let vendor =
        sqlx::query_as::<_, VendorData>("SELECT id, name, address FROM vendors WHERE id = ?")
            .bind(id)
            .fetch_optional(&pool)
            .await?;

    if let Some(mut vendor) = vendor {
        // Fetch contacts for this vendor
        let contacts: Vec<u64> =
            sqlx::query_as::<_, (u64,)>("SELECT id FROM contacts WHERE vendor_id = ?")
                .bind(vendor.id)
                .fetch_all(&pool)
                .await
                .unwrap_or_default()
                .into_iter()
                .map(|(id,)| id)
                .collect();

        vendor.contacts = contacts;
        Ok(Some(vendor))
    } else {
        Ok(None)
    }
}

pub async fn create_vendor(vendor: &VendorData, data: &DatabaseConnectionData) -> Result<u64> {
    let pool = create_pool(data).await?;
    let result = sqlx::query(
        r#"INSERT INTO vendors (name, address)
           VALUES (?, ?)"#,
    )
    .bind(&vendor.name)
    .bind(&vendor.address)
    .execute(&pool)
    .await?;

    Ok(result.last_insert_id())
}

pub async fn update_vendor(vendor: &VendorData, data: &DatabaseConnectionData) -> Result<bool> {
    let pool = create_pool(data).await?;
    let result = sqlx::query(
        r#"UPDATE vendors
           SET name = ?, address = ?
           WHERE id = ?"#,
    )
    .bind(&vendor.name)
    .bind(&vendor.address)
    .bind(vendor.id)
    .execute(&pool)
    .await?;

    Ok(result.rows_affected() > 0)
}

pub async fn delete_vendor(id: u64, data: &DatabaseConnectionData) -> Result<bool> {
    let pool = create_pool(data).await?;

    // First, delete all contacts associated with this vendor
    sqlx::query("DELETE FROM contacts WHERE vendor_id = ?")
        .bind(id)
        .execute(&pool)
        .await?;

    // Then delete the vendor
    let result = sqlx::query("DELETE FROM vendors WHERE id = ?")
        .bind(id)
        .execute(&pool)
        .await?;

    Ok(result.rows_affected() > 0)
}
