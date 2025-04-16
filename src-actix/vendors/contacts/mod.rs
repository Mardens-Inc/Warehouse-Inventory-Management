// Export contact modules
pub mod contacts_data;
pub mod contacts_db;
pub mod contacts_endpoint;

// Re-export key components for easier imports
pub use contacts_data::ContactData;
pub use contacts_db::{
    create_contact, delete_contact, get_contact_by_id, get_contacts, initialize_database, update_contact,
};
pub use contacts_endpoint::configure;
