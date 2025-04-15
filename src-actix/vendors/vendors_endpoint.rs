use actix_web::{get, web, HttpResponse, Responder};
use database_common_lib::http_error::Result;
use crate::contacts_endpoint;

#[get("/")]
async fn get_vendors() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().body("Hello World!"))
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("vendors")
            .service(get_vendors)
            .configure(contacts_endpoint::configure),
    );
}
