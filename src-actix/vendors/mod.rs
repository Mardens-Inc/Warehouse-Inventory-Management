// Export vendor modules
pub mod vendors_data;
pub mod vendors_db;
pub mod vendors_endpoint;
pub mod contacts;

// Re-export key components for easier imports
pub use vendors_data::VendorData;
pub use vendors_db::{
    create_vendor, delete_vendor, get_vendor_by_id, get_vendors, initialize_database, update_vendor,
};
pub use vendors_endpoint::configure;

// Re-export contacts for easier access
pub use contacts::*;
