use serde_hash::HashIds;

#[derive(HashIds, sqlx::FromRow)]
pub struct ContactData {
    #[hash]
    #[sqlx(primary_key)]
    pub id: u32,
    #[hash]
    pub vendor_id: u32,
    pub first_name: String,
    pub last_name: String,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub address: Option<String>,
    pub notes: Option<String>,
    pub created_at: Option<chrono::DateTime<chrono::Utc>>,
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}
