use serde_hash::HashIds;

#[derive(HashIds)]
pub struct VendorData {
	#[hash]
	id: u64,
	name: String,
	address: String,
	#[hash]
	contacts: Vec<u64>
}