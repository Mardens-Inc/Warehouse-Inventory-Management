use serde_hash::HashIds;
use sqlx::types::chrono;

#[derive(HashIds, sqlx::FromRow)]
pub struct ContactData {
    #[hash]
    pub id: u32,
    pub vendor_id: u32,
    pub first_name: String,
    pub last_name: String,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub address: Option<String>,
    pub notes: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}
