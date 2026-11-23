# Develop

Implement the task assigned by the Orchestrator and correct findings from
Testing.

1. Read [Testing's directives](TESTING.md) and the task's acceptance criteria
   before editing. Inspect the working tree and preserve unrelated changes.
2. Use the project skills in [`.agents/skills/`](../.agents/skills/).
   Use `next-best-practices` for framework patterns, `frontend-design` for
   design work, and `modern-web-guidance` for HTML, CSS, and client-side JavaScript.
   Use the installed Next.js docs to confirm version-specific behavior.
3. Run the applicable lint, build, and behavior checks before handing off.
   When fixing a finding, rerun its reproduction steps and check the affected
   behavior for regressions.

Report the changed files, exact checks run and their observed results, and any
remaining gaps or setup needed by Testing. Leave task acceptance and release
decisions to the Orchestrator.
