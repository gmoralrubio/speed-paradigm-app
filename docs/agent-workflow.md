# Three-agent workflow

The main Codex thread is the Orchestrator. It owns scope, task assignment, and
final acceptance. Both subagents report directly to it.

Follow the [pull request workflow](pull-requests.md) to hand off a reviewed
PR. Only the user performs the merge.

1. Define a small task with observable acceptance criteria, edit boundaries,
   relevant context, and verification steps. Give both agents the same criteria.
   Include any known baseline failures with evidence and link task-specific
   guides or skills where needed.
2. Assign the task to the project agent `develop` and wait for its
   [implementation handoff](../agents/DEVELOP.md). If Develop reports
   `INCOMPLETE` or `BLOCKED`, resolve open items with Develop or obtain the
   decision or access needed to proceed.
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
