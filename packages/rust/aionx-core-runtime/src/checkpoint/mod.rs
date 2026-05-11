use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;

use serde::{Deserialize, Serialize};

use crate::audit::AuditWriter;
use crate::config::CheckpointConfig;
use crate::error::CoreError;
use crate::policy::PolicyEngine;
pub use crate::types::CheckpointId;
use crate::types::SessionId;

#[derive(Debug)]
pub struct CheckpointEngine {
    store_root: PathBuf,
    policy: Arc<PolicyEngine>,
    audit: Arc<AuditWriter>,
    config: CheckpointConfig,
}

impl CheckpointEngine {
    pub fn new(
        store_root: PathBuf,
        policy: Arc<PolicyEngine>,
        audit: Arc<AuditWriter>,
        config: CheckpointConfig,
    ) -> Result<Self, CoreError> {
        Ok(Self {
            store_root,
            policy,
            audit,
            config,
        })
    }

    pub async fn capture(
        &self,
        _session_id: &SessionId,
        _working_set: &[PathBuf],
        _label: &str,
        _metadata: HashMap<String, serde_json::Value>,
    ) -> Result<CheckpointId, CoreError> {
        let _ = (&self.store_root, &self.policy, &self.audit, &self.config);
        Err(CoreError::Unsupported(
            "checkpoint capture is not implemented until WP-0005".to_string(),
        ))
    }

    pub async fn restore(
        &self,
        _session_id: &SessionId,
        checkpoint_id: &CheckpointId,
    ) -> Result<RestoreReport, CoreError> {
        let _ = (&self.store_root, &self.policy, &self.audit, &self.config);

        Err(CoreError::Unsupported(format!(
            "checkpoint restore is not implemented until WP-0005: {checkpoint_id}"
        )))
    }

    pub async fn list(&self, _session_id: &SessionId) -> Result<Vec<CheckpointMeta>, CoreError> {
        let _ = (&self.store_root, &self.policy, &self.audit, &self.config);
        Ok(Vec::new())
    }

    pub async fn delete(&self, _checkpoint_id: &CheckpointId) -> Result<(), CoreError> {
        let _ = (&self.store_root, &self.policy, &self.audit, &self.config);
        Err(CoreError::Unsupported(
            "checkpoint delete is not implemented until WP-0005".to_string(),
        ))
    }

    pub async fn gc(&self) -> Result<GcReport, CoreError> {
        let _ = (&self.store_root, &self.policy, &self.audit, &self.config);
        Ok(GcReport {
            deleted_checkpoints: 0,
            deleted_blobs: 0,
        })
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RestoreReport {
    pub checkpoint_id: CheckpointId,
    pub restored_files: Vec<PathBuf>,
    pub deleted_files: Vec<PathBuf>,
    pub recreated_deleted_paths: Vec<PathBuf>,
    pub skipped_files: Vec<PathBuf>,
    pub duration_ms: u64,
    pub degraded: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckpointMeta {
    pub checkpoint_id: CheckpointId,
    pub session_id: SessionId,
    pub label: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GcReport {
    pub deleted_checkpoints: usize,
    pub deleted_blobs: usize,
}
