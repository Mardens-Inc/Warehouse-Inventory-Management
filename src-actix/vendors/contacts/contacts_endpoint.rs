use crate::contacts_db;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use database_common_lib::database_connection::DatabaseConnectionData;
use database_common_lib::http_error::Result;
use serde_hash::hashids::{decode_single, encode_single};
use serde_json::json;
use std::sync::Arc;
use crate::vendors::ContactData;

#[get("/{id}")]
async fn get_contact(
    path: web::Path<(String, String)>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let (vendor_id, id) = path.into_inner();
    let data = data.get_ref().as_ref();
    let id = decode_single(id)? as u32;
    let vendor_id = decode_single(vendor_id)? as u32;
    let contact = contacts_db::get_contact_by_id(id, vendor_id, data).await?;
    Ok(HttpResponse::Ok().json(contact))
}

#[post("")]
async fn create_contact(
    contact: web::Json<ContactData>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let id = contacts_db::create_contact(&contact, data).await?;
    let id = encode_single(id as u64);
    Ok(HttpResponse::Created().json(json!({ "id": id})))
}

#[put("")]
async fn update_contact(
    contact: web::Json<ContactData>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let success = contacts_db::update_contact(&contact, data).await?;
    if success {
        Ok(HttpResponse::Ok().finish())
    } else {
        Ok(HttpResponse::NotFound().finish())
    }
}

#[delete("/{id}")]
async fn delete_contact(
    path: web::Path<(String, String)>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let (vendor_id, id) = path.into_inner();
    let data = data.get_ref().as_ref();
    let id = decode_single(id)? as u32;
    let vendor_id = decode_single(vendor_id)? as u32;
    let success = contacts_db::delete_contact(id, vendor_id, data).await?;
    if success {
        Ok(HttpResponse::Ok().finish())
    } else {
        Ok(HttpResponse::NotFound().finish())
    }
}

#[get("")]
async fn get_all_contacts(
    vendor_id: web::Path<String>,
    data: web::Data<Arc<DatabaseConnectionData>>,
) -> Result<impl Responder> {
    let data = data.get_ref().as_ref();
    let vendor_id = decode_single(vendor_id.into_inner())? as u32;
    let contacts = contacts_db::get_contacts(vendor_id, data).await?;
    Ok(HttpResponse::Ok().json(contacts))
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("{vendor_id}/contacts")
            .service(get_all_contacts)
            .service(get_contact)
            .service(create_contact)
            .service(update_contact)
            .service(delete_contact),
    );
}
