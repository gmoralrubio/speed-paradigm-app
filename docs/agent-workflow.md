# Three-agent workflow

The main Codex thread is the Orchestrator. It owns scope, task assignment, and
final acceptance. Both subagents report directly to it.

1. Define a small task with observable acceptance criteria, relevant files or
   areas, and verification steps. Give both agents the same criteria.
2. Assign the task to the project agent `develop` and wait for its
   [implementation handoff](../agents/DEVELOP.md).
3. Assign the project agent `testing` to [review](../agents/TESTING.md) the
   candidate in the shared workspace. Include the changed files, the Develop
   handoff, and any setup required to run the checks. Keep the candidate stable
   during review.
4. If Testing returns `CHANGES_REQUIRED`, send its findings to Develop and
   request a recheck after the fixes. If Testing returns `BLOCKED`, resolve the
   missing prerequisite and request a recheck.
5. Close the task only when Testing returns `PASS` for the current candidate.
   Keep a brief record of the checks, findings, and rechecks for the final
   submission.
