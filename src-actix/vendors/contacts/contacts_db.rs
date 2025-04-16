use crate::vendors::ContactData;
use anyhow::Result;
use database_common_lib::database_connection::{create_pool, DatabaseConnectionData};
use log::debug;
use sqlx::{Executor, MySqlPool};

pub async fn initialize_database(pool: &MySqlPool) -> Result<()> {
    debug!("Initializing contacts database");
    pool.execute(
        r#"
		create table if not exists contacts (
			id INT UNSIGNED NOT NULL AUTO_INCREMENT,
			vendor_id INT UNSIGNED NOT NULL,
			first_name VARCHAR(255) NOT NULL,
			last_name VARCHAR(255) NOT NULL,
			email VARCHAR(255),
			phone VARCHAR(255),
			address TEXT,
			notes TEXT,
			created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		)
	"#,
    )
    .await?;
    Ok(())
}

pub async fn get_contacts(
    vendor_id: u32,
    data: &DatabaseConnectionData,
) -> Result<Vec<ContactData>> {
    let pool = create_pool(data).await?;
    Ok(
        sqlx::query_as::<_, ContactData>(r#"SELECT * FROM contacts WHERE vendor_id = ?"#)
            .bind(vendor_id)
            .fetch_all(&pool)
            .await?,
    )
}

pub async fn get_contact_by_id(
    id: u32,
    vendor_id: u32,
    data: &DatabaseConnectionData,
) -> Result<Option<ContactData>> {
    let pool = create_pool(data).await?;
    Ok(
        sqlx::query_as::<_, ContactData>(
            r#"SELECT * FROM contacts WHERE id = ? AND vendor_id = ?"#,
        )
        .bind(id)
        .bind(vendor_id)
        .fetch_optional(&pool)
        .await?,
    )
}

pub async fn create_contact(contact: &ContactData, data: &DatabaseConnectionData) -> Result<u32> {
    let pool = create_pool(data).await?;
    let result = sqlx::query(
        r#"INSERT INTO contacts (vendor_id, first_name, last_name, email, phone, address, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?)"#,
    )
    .bind(contact.vendor_id)
    .bind(&contact.first_name)
    .bind(&contact.last_name)
    .bind(&contact.email)
    .bind(&contact.phone)
    .bind(&contact.address)
    .bind(&contact.notes)
    .execute(&pool)
    .await?;
    Ok(result.last_insert_id() as u32)
}

pub async fn update_contact(contact: &ContactData, data: &DatabaseConnectionData) -> Result<bool> {
    let pool = create_pool(data).await?;
    let result = sqlx::query(
        r#"UPDATE contacts
           SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, notes = ?
           WHERE id = ? AND vendor_id = ?"#,
    )
    .bind(&contact.first_name)
    .bind(&contact.last_name)
    .bind(&contact.email)
    .bind(&contact.phone)
    .bind(&contact.address)
    .bind(&contact.notes)
    .bind(contact.id)
    .bind(contact.vendor_id)
    .execute(&pool)
    .await?;

    Ok(result.rows_affected() > 0)
}

pub async fn delete_contact(
    id: u32,
    vendor_id: u32,
    data: &DatabaseConnectionData,
) -> Result<bool> {
    let pool = create_pool(data).await?;
    let result = sqlx::query(r#"DELETE FROM contacts WHERE id = ? AND vendor_id = ?"#)
        .bind(id)
        .bind(vendor_id)
        .execute(&pool)
        .await?;

    Ok(result.rows_affected() > 0)
}
