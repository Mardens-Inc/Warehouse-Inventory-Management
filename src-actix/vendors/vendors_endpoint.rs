use crate::vendors::{contacts_endpoint, vendors_db, VendorData};
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use database_common_lib::{database_connection::DatabaseConnectionData, http_error::Result};
use serde_hash::hashids::decode_single;
use std::sync::Arc;

#[get("/")]
async fn get_vendors(data: web::Data<Arc<DatabaseConnectionData>>) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let vendors = vendors_db::get_vendors(data).await?;
    Ok(HttpResponse::Ok().json(vendors))
}

#[get("/{id}")]
async fn get_vendor_by_id(
    id: web::Path<String>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let id = decode_single(id.into_inner())?;
    let vendor = vendors_db::get_vendor_by_id(id, data).await?;

    match vendor {
        Some(vendor) => Ok(HttpResponse::Ok().json(vendor)),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

#[post("")]
async fn create_vendor(
    mut vendor: web::Json<VendorData>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();

    // Initialize the empty contacts field
    vendor.contacts = Vec::new();

    let vendor_id = vendors_db::create_vendor(&vendor, data).await?;

    // Return the newly created vendor
    let vendor = vendors_db::get_vendor_by_id(vendor_id, data).await?;
    match vendor {
        Some(vendor) => Ok(HttpResponse::Created().json(vendor)),
        None => Ok(HttpResponse::InternalServerError().finish()),
    }
}

#[put("/{id}")]
async fn update_vendor(
    id: web::Path<String>,
    vendor: web::Json<VendorData>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let id = decode_single(id.into_inner())?;

    // Ensure the IDs match
    let mut vendor = vendor.into_inner();
    vendor.id = id;

    let updated = vendors_db::update_vendor(&vendor, data).await?;

    if updated {
        let updated_vendor = vendors_db::get_vendor_by_id(id, data).await?;
        match updated_vendor {
            Some(vendor) => Ok(HttpResponse::Ok().json(vendor)),
            None => Ok(HttpResponse::InternalServerError().finish()),
        }
    } else {
        Ok(HttpResponse::NotFound().finish())
    }
}

#[delete("/{id}")]
async fn delete_vendor(
    id: web::Path<String>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let id = decode_single(id.into_inner())?;

    let deleted = vendors_db::delete_vendor(id, data).await?;

    if deleted {
        Ok(HttpResponse::NoContent().finish())
    } else {
        Ok(HttpResponse::NotFound().finish())
    }
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("vendors")
            .configure(contacts_endpoint::configure)
            .service(get_vendors)
            .service(get_vendor_by_id)
            .service(create_vendor)
            .service(update_vendor)
            .service(delete_vendor),
    );
}
