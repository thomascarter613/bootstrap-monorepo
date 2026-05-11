use std::sync::Arc;

use aionx_core_runtime::{
    AuditOutput, AuditWriter, CheckpointId, CoreError, PolicyEngine, PolicyId, RuleId, SessionId,
};

#[test]
fn shared_ids_are_constructible() {
    let session_id = SessionId::new();
    let checkpoint_id = CheckpointId::new();
    let policy_id = PolicyId::new("platform-default");
    let rule_id = RuleId::new("deny-secrets-read");

    assert!(!session_id.to_string().is_empty());
    assert!(!checkpoint_id.to_string().is_empty());
    assert_eq!(policy_id.to_string(), "platform-default");
    assert_eq!(rule_id.to_string(), "deny-secrets-read");
}

#[test]
fn audit_writer_is_constructible() {
    let audit = AuditWriter::new(AuditOutput::Stdout, 4096);
    let _audit = Arc::new(audit);
}

#[test]
fn policy_engine_stub_loads_valid_yaml() {
    let audit = Arc::new(AuditWriter::new(AuditOutput::Stdout, 4096));

    let yaml = r#"
id: "platform-default"
version: "1.0.0"
rules: []
"#;

    let policy = PolicyEngine::load(yaml, audit);

    assert!(policy.is_ok());
}

#[test]
fn policy_engine_stub_rejects_invalid_yaml() {
    let audit = Arc::new(AuditWriter::new(AuditOutput::Stdout, 4096));

    let yaml = r#"
id: [
"#;

    let policy = PolicyEngine::load(yaml, audit);

    assert!(matches!(policy, Err(CoreError::PolicyLoad { .. })));
}
