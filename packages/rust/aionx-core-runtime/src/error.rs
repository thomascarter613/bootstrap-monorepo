use thiserror::Error;

use crate::policy::PolicyLoadError;

#[non_exhaustive]
#[derive(Debug, Error)]
pub enum CoreError {
    #[error("policy denied: action={action:?} reason={reason}")]
    PolicyDenied { action: String, reason: String },

    #[error("policy load failed: {source}")]
    PolicyLoad {
        #[from]
        source: PolicyLoadError,
    },

    #[error("policy reload failed; previous policy remains active: {reason}")]
    PolicyReload { reason: String },

    #[error("sandbox spawn failed: {0}")]
    SandboxSpawn(#[source] std::io::Error),

    #[error("sandbox resource limit exceeded: {resource}")]
    ResourceLimitExceeded { resource: String },

    #[error("process exited with status {code}: {stderr_tail}")]
    ProcessFailed { code: i32, stderr_tail: String },

    #[error("sandbox session {session_id} not found")]
    SandboxSessionNotFound { session_id: String },

    #[error("pty open failed: {0}")]
    PtyOpen(#[source] nix::Error),

    #[error("pty session {session_id} not found")]
    PtySessionNotFound { session_id: String },

    #[error("pty replay unavailable for session {session_id}")]
    PtyReplayUnavailable { session_id: String },

    #[error("checkpoint {id} not found")]
    CheckpointNotFound { id: String },

    #[error("checkpoint integrity failure: expected={expected} got={got}")]
    CheckpointIntegrity { expected: String, got: String },

    #[error(
        "rollback partial failure; system is in degraded state and requires manual inspection"
    )]
    RollbackPartial,

    #[error("patch apply conflict in {path}: {detail}")]
    PatchConflict { path: String, detail: String },

    #[error("patch parse error: {0}")]
    PatchParse(String),

    #[error("ffi invalid argument: {0}")]
    FfiInvalidArgument(String),

    #[error("ffi null pointer: {0}")]
    FfiNullPointer(String),

    #[error("audit buffer full")]
    AuditBufferFull,

    #[error("unsupported operation: {0}")]
    Unsupported(String),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("json serialization error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("yaml serialization error: {0}")]
    Yaml(#[from] serde_yaml::Error),

    #[error("toml deserialization error: {0}")]
    TomlDeserialize(#[from] toml::de::Error),

    #[error("configuration error: {0}")]
    Config(String),
}
