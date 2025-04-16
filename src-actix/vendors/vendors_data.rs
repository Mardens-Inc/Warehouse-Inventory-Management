use serde_hash::HashIds;

#[derive(HashIds, sqlx::FromRow)]
pub struct VendorData {
	#[hash]
	#[sqlx(primary_key)]
	pub id: u64,
	pub name: String,
	pub address: String,
	#[hash]
	#[sqlx(skip)]
	pub contacts: Vec<u64>
}