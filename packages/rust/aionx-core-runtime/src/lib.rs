//! AionX Layer 1 Core Runtime.
//!
//! This crate owns the platform trust boundary for host interaction:
//! policy evaluation, auditing, patching, checkpointing, PTY management,
//! sandboxed process execution, and the C ABI boundary.

pub mod audit;
pub mod checkpoint;
pub mod config;
pub mod error;
pub mod ffi;
pub mod patch;
pub mod policy;
pub mod pty;
pub mod sandbox;
pub mod types;

pub use audit::{AuditOutput, AuditRecord, AuditWriter, Outcome};
pub use checkpoint::{CheckpointEngine, CheckpointId, RestoreReport};
pub use error::CoreError;
pub use patch::{ApplyReport, ConflictStrategy, PatchEngine};
pub use policy::{ActionRequest, Decision, PolicyEngine};
pub use pty::{CaptureFrame, PtyHandle, PtyManager};
pub use sandbox::{SandboxManager, SandboxSpec, SandboxedProcess};
pub use types::{PolicyId, RuleId, SessionId};
