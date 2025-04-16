
use actix_web::{get, web, HttpResponse, Responder};
use database_common_lib::http_error::Result;

#[get("")]
async fn index() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().body("Hello World!"))
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("contacts"));
}
