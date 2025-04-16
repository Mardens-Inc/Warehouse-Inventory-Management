use actix_web::web;
use anyhow::Result;
use database_common_lib::actix_extension::create_http_server;
use database_common_lib::database_connection::{create_pool, DatabaseConnectionData};
use database_common_lib::set_database_name;
use include_dir::include_dir;
use log::*;
use pretty_env_logger::env_logger;
use serde_hash::salt::generate_salt;
use std::sync::Arc;
use vite_actix::start_vite_server;

// Import modules using simplified structure
mod vendors;
use vendors::contacts::contacts_db;
use vendors::vendors_endpoint;

pub static DEBUG: bool = cfg!(debug_assertions);
const PORT: u16 = 1428;

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

    let connection_data = DatabaseConnectionData::get().await?;
    let pool = create_pool(&connection_data).await?;
    contacts_db::initialize_database(&pool).await?;
    pool.close().await;

    let server = create_http_server(
        move || {
            let connection_data = web::Data::new(Arc::new(connection_data.clone()));
            Box::new(move |cfg| {
                cfg.service(
                    web::scope("api")
                        .app_data(connection_data.clone())
                        .configure(vendors_endpoint::configure),
                );
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
