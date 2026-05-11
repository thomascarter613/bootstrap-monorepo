use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use nix::sys::signal::Signal;

use crate::audit::AuditWriter;
use crate::error::CoreError;
use crate::policy::PolicyEngine;
use crate::pty::PtyHandle;
use crate::types::{PolicyId, SessionId};

#[derive(Debug)]
pub struct SandboxManager {
    policy: Arc<PolicyEngine>,
    audit: Arc<AuditWriter>,
    cgroup: CgroupManager,
}

impl SandboxManager {
    pub fn new(
        policy: Arc<PolicyEngine>,
        audit: Arc<AuditWriter>,
        cgroup_root: &Path,
    ) -> Result<Self, CoreError> {
        Ok(Self {
            policy,
            audit,
            cgroup: CgroupManager {
                root: cgroup_root.to_path_buf(),
            },
        })
    }

    pub async fn spawn(&self, spec: SandboxSpec) -> Result<SandboxedProcess, CoreError> {
        let _ = (&self.policy, &self.audit, &self.cgroup);

        Ok(SandboxedProcess {
            session_id: spec.session_id,
            pid: 0,
            ns_pid: 0,
            state: ProcessState::Running,
        })
    }

    pub fn list_sessions(&self) -> Vec<SessionInfo> {
        let _ = (&self.policy, &self.audit, &self.cgroup);
        Vec::new()
    }

    pub async fn signal(&self, _session_id: &SessionId, _sig: Signal) -> Result<(), CoreError> {
        let _ = (&self.policy, &self.audit, &self.cgroup);
        Ok(())
    }

    pub async fn wait(&self, session_id: &SessionId) -> Result<ExitStatus, CoreError> {
        let _ = (&self.policy, &self.audit, &self.cgroup);

        Ok(ExitStatus {
            session_id: session_id.clone(),
            code: Some(0),
            signal: None,
            timed_out: false,
            warnings: Vec::new(),
        })
    }
}

#[derive(Debug, Clone)]
pub struct CgroupManager {
    pub root: PathBuf,
}

#[derive(Debug, Clone)]
pub struct SandboxSpec {
    pub session_id: SessionId,
    pub command: Vec<String>,
    pub env: HashMap<String, String>,
    pub working_dir: PathBuf,
    pub policy_id: PolicyId,
    pub resource_limits: ResourceLimits,
    pub namespaces: NamespaceFlags,
    pub seccomp_profile: SeccompProfile,
    pub stdin: StdinSource,
    pub stdout: OutputSink,
    pub stderr: OutputSink,
}

#[derive(Debug, Clone)]
pub struct ResourceLimits {
    pub cpu_quota_us: Option<u64>,
    pub cpu_period_us: u64,
    pub memory_bytes: Option<u64>,
    pub max_fds: Option<u32>,
    pub wall_clock_secs: Option<u64>,
    pub max_pids: Option<u32>,
}

impl Default for ResourceLimits {
    fn default() -> Self {
        Self {
            cpu_quota_us: None,
            cpu_period_us: 100_000,
            memory_bytes: None,
            max_fds: None,
            wall_clock_secs: None,
            max_pids: None,
        }
    }
}

#[derive(Debug, Clone)]
pub struct NamespaceFlags {
    pub pid: bool,
    pub mount: bool,
    pub network: bool,
    pub uts: bool,
    pub ipc: bool,
    pub user: bool,
    pub cgroup: bool,
    pub time: bool,
}

impl Default for NamespaceFlags {
    fn default() -> Self {
        Self {
            pid: true,
            mount: true,
            network: true,
            uts: true,
            ipc: true,
            user: true,
            cgroup: true,
            time: false,
        }
    }
}

#[derive(Debug, Clone)]
pub enum SeccompProfile {
    StrictReadonly,
    Standard,
    Full,
}

#[derive(Debug, Clone)]
pub enum StdinSource {
    Pipe,
    Null,
    Pty(PtyHandle),
}

#[derive(Debug, Clone)]
pub enum OutputSink {
    Pipe,
    Null,
    Pty(PtyHandle),
    Capture,
}

#[derive(Debug, Clone)]
pub struct SandboxedProcess {
    pub session_id: SessionId,
    pub pid: u32,
    pub ns_pid: u32,
    pub state: ProcessState,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ProcessState {
    Running,
    Exited { code: i32 },
    Killed { signal: i32 },
    TimedOut,
    PolicyDenied,
}

#[derive(Debug, Clone)]
pub struct SessionInfo {
    pub session_id: SessionId,
    pub state: ProcessState,
}

#[derive(Debug, Clone)]
pub struct ExitStatus {
    pub session_id: SessionId,
    pub code: Option<i32>,
    pub signal: Option<i32>,
    pub timed_out: bool,
    pub warnings: Vec<String>,
}
