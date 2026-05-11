use std::path::{Path, PathBuf};
use std::sync::Arc;

use crate::audit::AuditWriter;
use crate::error::CoreError;
use crate::policy::PolicyEngine;
use crate::types::SessionId;

#[derive(Debug)]
pub struct PatchEngine {
    policy: Arc<PolicyEngine>,
    audit: Arc<AuditWriter>,
}

impl PatchEngine {
    pub fn new(policy: Arc<PolicyEngine>, audit: Arc<AuditWriter>) -> Self {
        Self { policy, audit }
    }

    pub fn parse(&self, diff: &str) -> Result<Patch, CoreError> {
        let _ = (&self.policy, &self.audit);

        if diff.trim().is_empty() {
            return Err(CoreError::PatchParse("patch text is empty".to_string()));
        }

        Ok(Patch {
            raw: diff.to_string(),
            files: Vec::new(),
        })
    }

    pub async fn apply(
        &self,
        _session_id: &SessionId,
        _patch: &Patch,
        _root: &Path,
        _strategy: ConflictStrategy,
        dry_run: bool,
    ) -> Result<ApplyReport, CoreError> {
        let _ = (&self.policy, &self.audit);

        Ok(ApplyReport {
            applied: Vec::new(),
            conflicted: Vec::new(),
            skipped: Vec::new(),
            dry_run,
        })
    }

    pub async fn diff(
        &self,
        _session_id: &SessionId,
        _old_root: &Path,
        _new_root: &Path,
    ) -> Result<Patch, CoreError> {
        let _ = (&self.policy, &self.audit);

        Err(CoreError::Unsupported(
            "patch diff is not implemented until WP-0004".to_string(),
        ))
    }
}

#[derive(Debug, Clone)]
pub struct Patch {
    pub raw: String,
    pub files: Vec<PatchFile>,
}

#[derive(Debug, Clone)]
pub struct PatchFile {
    pub path: PathBuf,
    pub hunks: Vec<PatchHunk>,
}

#[derive(Debug, Clone)]
pub struct PatchHunk {
    pub old_start: usize,
    pub old_count: usize,
    pub new_start: usize,
    pub new_count: usize,
    pub lines: Vec<String>,
}

#[derive(Debug, Clone)]
pub enum ConflictStrategy {
    Abort,
    ConflictMarkers,
    TakeIncoming,
    TakeExisting,
    AstMerge,
}

#[derive(Debug, Clone)]
pub struct ApplyReport {
    pub applied: Vec<PathBuf>,
    pub conflicted: Vec<ConflictDetail>,
    pub skipped: Vec<PathBuf>,
    pub dry_run: bool,
}

#[derive(Debug, Clone)]
pub struct ConflictDetail {
    pub path: PathBuf,
    pub detail: String,
}
