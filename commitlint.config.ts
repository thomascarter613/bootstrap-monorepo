export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "security",
        "style",
        "test"
      ]
    ],
    "scope-empty": [0, "never"],
    "subject-case": [0]
  }
};
