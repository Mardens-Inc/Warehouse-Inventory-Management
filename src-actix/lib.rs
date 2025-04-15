use actix_web::web;
use anyhow::Result;
use database_common_lib::actix_extension::create_http_server;
use database_common_lib::set_database_name;
use include_dir::include_dir;
use log::*;
use pretty_env_logger::env_logger;
use serde_hash::salt::generate_salt;
use vite_actix::start_vite_server;

// Vendor Modules
#[path = "vendors/vendors_data.rs"]
mod vendors_data;
#[path = "vendors/vendors_db.rs"]
mod vendors_db;

#[path = "vendors/vendors_endpoint.rs"]
mod vendors_endpoint;
// Contact Modules
#[path = "vendors/contacts/contacts_data.rs"]
mod contacts_data;
#[path = "vendors/contacts/contacts_db.rs"]
mod contacts_db;
#[path = "vendors/contacts/contacts_endpoint.rs"]
mod contacts_endpoint;

pub static DEBUG: bool = cfg!(debug_assertions);
const PORT: u16 = 1421;

pub async fn run() -> Result<()> {
    env_logger::builder()
        .filter_level(LevelFilter::Debug)
        .init();
    info!("Warehouse app is starting...");

    set_database_name!("warehouse");
    serde_hash::hashids::SerdeHashOptions::new()
        .with_salt(if DEBUG {
            "warehouse".to_string()
        } else {
            generate_salt()
        })
        .build();

    let server = create_http_server(
        || {
            Box::new(|cfg| {
                cfg.service(web::scope("api").configure(vendors_endpoint::configure));
            })
        },
        include_dir!("target/wwwroot"),
        PORT,
    )?;

    info!(
        "Starting {} server at http://127.0.0.1:{}...",
        if DEBUG { "development" } else { "production" },
        PORT
    );

    if DEBUG {
        #[allow(clippy::zombie_processes)]
        start_vite_server().expect("Failed to start vite server");
    }
    let stop_result = server.await;
    debug!("Server stopped");

    Ok(stop_result?)
}
