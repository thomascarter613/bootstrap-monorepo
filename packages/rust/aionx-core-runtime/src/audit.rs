use std::path::PathBuf;

use chrono::{DateTime, Utc};
use serde::Serialize;
use serde_json::Value;
use uuid::Uuid;

use crate::error::CoreError;
use crate::types::SessionId;

#[derive(Debug, Clone, Serialize)]
pub struct AuditRecord {
    pub id: Uuid,
    pub timestamp: DateTime<Utc>,
    pub session_id: Option<SessionId>,
    pub layer: &'static str,
    pub event_type: String,
    pub outcome: Outcome,
    pub actor: String,
    pub payload: Value,
    pub trace_id: Option<String>,
}

impl AuditRecord {
    pub fn new(
        session_id: Option<SessionId>,
        layer: &'static str,
        event_type: impl Into<String>,
        outcome: Outcome,
        actor: impl Into<String>,
        payload: Value,
    ) -> Self {
        Self {
            id: Uuid::now_v7(),
            timestamp: Utc::now(),
            session_id,
            layer,
            event_type: event_type.into(),
            outcome,
            actor: actor.into(),
            payload,
            trace_id: None,
        }
    }
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Outcome {
    Permit,
    Deny,
    Success,
    Failure,
    Info,
}

#[derive(Debug, Clone)]
pub enum AuditOutput {
    File(PathBuf),
    Stdout,
    Otlp(String),
}

#[derive(Debug, Clone)]
pub struct AuditWriter;

impl AuditWriter {
    pub fn new(_output: AuditOutput, _buffer_size: usize) -> Self {
        Self
    }

    pub fn record(&self, _rec: AuditRecord) -> Result<(), CoreError> {
        Ok(())
    }

    pub async fn flush(&self) -> Result<(), CoreError> {
        Ok(())
    }
}
