use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};

use crate::error::CoreError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CoreRuntimeConfig {
    pub runtime: RuntimeConfig,
    pub audit: AuditConfig,
    pub policy: PolicyConfig,
    pub sandbox: SandboxConfig,
    pub pty: PtyConfig,
    pub checkpoint: CheckpointConfig,
    pub patch: PatchConfig,
}

impl CoreRuntimeConfig {
    pub fn load_from_path(path: &Path) -> Result<Self, CoreError> {
        let raw = std::fs::read_to_string(path)?;
        Ok(toml::from_str(&raw)?)
    }
}

impl Default for CoreRuntimeConfig {
    fn default() -> Self {
        Self {
            runtime: RuntimeConfig::default(),
            audit: AuditConfig::default(),
            policy: PolicyConfig::default(),
            sandbox: SandboxConfig::default(),
            pty: PtyConfig::default(),
            checkpoint: CheckpointConfig::default(),
            patch: PatchConfig::default(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeConfig {
    pub worker_threads: usize,
    pub max_blocking_threads: usize,
}

impl Default for RuntimeConfig {
    fn default() -> Self {
        Self {
            worker_threads: 0,
            max_blocking_threads: 512,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditConfig {
    pub output: String,
    pub buffer_size: usize,
    pub flush_interval_ms: u64,
}

impl Default for AuditConfig {
    fn default() -> Self {
        Self {
            output: "stdout".to_string(),
            buffer_size: 4096,
            flush_interval_ms: 1000,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PolicyConfig {
    pub platform_default_path: PathBuf,
    pub reload_watch: bool,
}

impl Default for PolicyConfig {
    fn default() -> Self {
        Self {
            platform_default_path: PathBuf::from("/etc/aionx/policy/platform-default.yaml"),
            reload_watch: true,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SandboxConfig {
    pub cgroup_root: PathBuf,
    pub default_seccomp: String,
    pub default_wall_clock_secs: u64,
    pub default_memory_bytes: u64,
    pub default_cpu_quota_pct: u64,
    pub rootfs_base: PathBuf,
}

impl Default for SandboxConfig {
    fn default() -> Self {
        Self {
            cgroup_root: PathBuf::from("/sys/fs/cgroup/aionx"),
            default_seccomp: "standard".to_string(),
            default_wall_clock_secs: 300,
            default_memory_bytes: 536_870_912,
            default_cpu_quota_pct: 50,
            rootfs_base: PathBuf::from("/var/aionx/rootfs/base"),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PtyConfig {
    pub replay_buffer_bytes: usize,
    pub replay_mmap_threshold: usize,
    pub replay_retention_secs: u64,
    pub replay_file_dir: PathBuf,
}

impl Default for PtyConfig {
    fn default() -> Self {
        Self {
            replay_buffer_bytes: 4_194_304,
            replay_mmap_threshold: 1_048_576,
            replay_retention_secs: 3600,
            replay_file_dir: PathBuf::from("/var/aionx/pty-replay"),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckpointConfig {
    pub store_root: PathBuf,
    pub max_checkpoints_per_session: usize,
    pub retention_hours: u64,
    pub compression: String,
    pub sign_manifests: bool,
    pub hmac_key_env: String,
}

impl Default for CheckpointConfig {
    fn default() -> Self {
        Self {
            store_root: PathBuf::from("/var/aionx/checkpoints"),
            max_checkpoints_per_session: 50,
            retention_hours: 48,
            compression: "lz4".to_string(),
            sign_manifests: true,
            hmac_key_env: "AIONX_CHECKPOINT_HMAC_KEY".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PatchConfig {
    pub ast_merge_socket: PathBuf,
    pub ast_merge_timeout_ms: u64,
    pub ast_merge_confidence_threshold: f64,
}

impl Default for PatchConfig {
    fn default() -> Self {
        Self {
            ast_merge_socket: PathBuf::from("/var/run/aionx/ast-merge.sock"),
            ast_merge_timeout_ms: 5000,
            ast_merge_confidence_threshold: 0.85,
        }
    }
}
