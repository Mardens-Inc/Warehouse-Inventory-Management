
use actix_web::{web, HttpResponse, Responder};
use anyhow::Result;

fn index() -> Result<impl Responder> {
    Ok(HttpResponse::Ok().body("Hello World!"))
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("contacts"));
}
