use std::collections::HashMap;
use std::path::PathBuf;
use std::sync::Arc;

use serde::{Deserialize, Serialize};
use serde_json::json;
use thiserror::Error;

use crate::audit::{AuditRecord, AuditWriter, Outcome};
use crate::error::CoreError;
use crate::types::{RuleId, SessionId};

#[derive(Debug, Error)]
#[non_exhaustive]
pub enum PolicyLoadError {
    #[error("yaml parse error: {0}")]
    Yaml(#[from] serde_yaml::Error),

    #[error("schema validation failed: {0}")]
    Validation(String),

    #[error("policy inheritance cycle detected: {0}")]
    Cycle(String),
}

#[derive(Debug)]
pub struct PolicyEngine {
    resolver: Arc<PolicyResolver>,
    audit: Arc<AuditWriter>,
}

impl PolicyEngine {
    pub fn load(yaml: &str, audit: Arc<AuditWriter>) -> Result<Self, CoreError> {
        let _parsed: serde_yaml::Value =
            serde_yaml::from_str(yaml).map_err(PolicyLoadError::Yaml)?;

        audit.record(AuditRecord::new(
            None,
            "policy",
            "policy-load",
            Outcome::Success,
            "system",
            json!({ "status": "loaded-stub" }),
        ))?;

        Ok(Self {
            resolver: Arc::new(PolicyResolver),
            audit,
        })
    }

    pub fn evaluate(&self, request: &ActionRequest) -> Decision {
        let _ = &self.resolver;

        let decision = Decision::Deny {
            matched_rule: None,
            reason: "deny by default; policy evaluator not yet implemented".to_string(),
        };

        let _ = self.audit.record(AuditRecord::new(
            Some(request.session_id.clone()),
            "policy",
            "policy-decision",
            Outcome::Deny,
            request.actor.clone(),
            json!({
                "action": request.action,
                "reason": "deny by default; policy evaluator not yet implemented"
            }),
        ));

        decision
    }

    pub async fn reload(&self, yaml: &str) -> Result<(), CoreError> {
        let _parsed: serde_yaml::Value =
            serde_yaml::from_str(yaml).map_err(PolicyLoadError::Yaml)?;

        self.audit.record(AuditRecord::new(
            None,
            "policy",
            "policy-reload",
            Outcome::Success,
            "system",
            json!({ "status": "reloaded-stub" }),
        ))?;

        Ok(())
    }

    pub fn explain(&self, _request: &ActionRequest) -> Vec<RuleMatch> {
        Vec::new()
    }
}

#[derive(Debug)]
pub struct PolicyResolver;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActionRequest {
    pub session_id: SessionId,
    pub actor: String,
    pub action: ActionType,
    pub resource: ResourceDescriptor,
    pub context: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ActionType {
    FileRead,
    FileWrite,
    FileDelete,
    Exec,
    NetEgress,
    NetIngress,
    Ipc,
    PtyOpen,
    CheckpointWrite,
    CheckpointRead,
    PatchApply,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ResourceDescriptor {
    pub path: Option<PathBuf>,
    pub command: Option<Vec<String>>,
    pub network: Option<NetworkDescriptor>,
    pub checkpoint_store_path: Option<PathBuf>,
    pub metadata: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct NetworkDescriptor {
    pub cidr: Option<String>,
    pub port: Option<u16>,
    pub protocol: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Decision {
    Permit {
        matched_rule: Option<RuleId>,
    },
    Deny {
        matched_rule: Option<RuleId>,
        reason: String,
    },
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RuleMatch {
    pub rule_id: RuleId,
    pub priority: i32,
    pub effect: RuleEffect,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RuleEffect {
    Permit,
    Deny,
}
