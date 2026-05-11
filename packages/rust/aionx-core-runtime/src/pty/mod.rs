use std::path::PathBuf;
use std::sync::Arc;

use bytes::Bytes;
use chrono::{DateTime, Utc};
use futures::{stream, Stream};
use nix::sys::signal::Signal;
use serde::{Deserialize, Serialize};

use crate::audit::AuditWriter;
use crate::error::CoreError;
use crate::policy::PolicyEngine;
use crate::types::SessionId;

#[derive(Debug)]
pub struct PtyManager {
    policy: Arc<PolicyEngine>,
    audit: Arc<AuditWriter>,
    replay_config: ReplayConfig,
}

impl PtyManager {
    pub fn new(
        policy: Arc<PolicyEngine>,
        audit: Arc<AuditWriter>,
        replay_config: ReplayConfig,
    ) -> Self {
        Self {
            policy,
            audit,
            replay_config,
        }
    }

    pub async fn open(&self, spec: PtySpec) -> Result<PtyHandle, CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);

        Ok(PtyHandle {
            session_id: spec.session_id,
        })
    }

    pub async fn write(&self, _id: &SessionId, _data: &[u8]) -> Result<(), CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);
        Err(CoreError::Unsupported(
            "pty write is not implemented until WP-0006".to_string(),
        ))
    }

    pub fn subscribe(
        &self,
        _id: &SessionId,
    ) -> Result<impl Stream<Item = CaptureFrame>, CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);
        Ok(stream::empty())
    }

    pub async fn replay(
        &self,
        _id: &SessionId,
        _start_offset: usize,
    ) -> Result<Vec<CaptureFrame>, CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);
        Ok(Vec::new())
    }

    pub async fn resize(&self, _id: &SessionId, _cols: u16, _rows: u16) -> Result<(), CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);
        Ok(())
    }

    pub async fn signal(&self, _id: &SessionId, _sig: Signal) -> Result<(), CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);
        Ok(())
    }

    pub async fn close(&self, _id: &SessionId) -> Result<(), CoreError> {
        let _ = (&self.policy, &self.audit, &self.replay_config);
        Ok(())
    }
}

#[derive(Debug, Clone)]
pub struct PtyHandle {
    pub session_id: SessionId,
}

#[derive(Debug, Clone)]
pub struct PtySpec {
    pub session_id: SessionId,
    pub command: Vec<String>,
    pub working_dir: PathBuf,
    pub env: Vec<(String, String)>,
    pub cols: u16,
    pub rows: u16,
}

#[derive(Debug, Clone)]
pub struct ReplayConfig {
    pub replay_buffer_bytes: usize,
    pub replay_mmap_threshold_bytes: usize,
    pub replay_retention_secs: u64,
    pub replay_file_dir: PathBuf,
}

impl Default for ReplayConfig {
    fn default() -> Self {
        Self {
            replay_buffer_bytes: 4_194_304,
            replay_mmap_threshold_bytes: 1_048_576,
            replay_retention_secs: 3600,
            replay_file_dir: PathBuf::from("/var/aionx/pty-replay"),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CaptureFrame {
    pub session_id: SessionId,
    pub seq: u64,
    pub timestamp: DateTime<Utc>,
    pub stream: StreamType,
    pub data: Bytes,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum StreamType {
    Stdout,
    Stderr,
}
