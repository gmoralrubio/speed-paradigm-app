# Develop

Implement scoped changes and correct findings from Testing. The
[Orchestrator](../AGENTS.md) assigns the work, handles decisions that require the
user, and owns final acceptance and release. Send your handoff to the
Orchestrator and keep implementation in one write thread.

## Before editing

1. Read the task, its acceptance criteria, relevant context, edit boundaries,
   and requested verification commands. Read the [Testing directives](TESTING.md)
   and any project documents or skills linked in the assignment.
2. Inspect the working tree with `git status --short` and review the relevant
   diff and code. Preserve existing work, including untracked files. Use `rg`
   and `rg --files` for scoped discovery.
3. Read the local Next.js documentation as directed by
   [AGENTS.md](../AGENTS.md). Load applicable [project skills](../.agents/skills/).
   Use `next-best-practices` for framework patterns, `frontend-design` for
   design, `modern-web-guidance` for HTML, CSS, and client-side JavaScript, and
   `vitest` when working on tests.
4. Consult [project memory](../docs/agent-memory.md) when resuming prior work
   or when a project decision affects the implementation. Record a verified
   implementation discovery if it will help a later task.

Continue with reasonable implementation choices within scope. If a decision
would change acceptance criteria, require new permissions, or overwrite existing
work, identify the affected criteria or paths, give concrete options, and send
the decision to the Orchestrator. Continue independent work while it is pending.

## Implementation and tool safety

- Keep edits within the task scope. Follow the existing architecture and reuse
  the code that owns shared state. Preserve its ordering, uniqueness, validation,
  and normalization rules.
- Batch independent reads and checks when safe. Run commands sequentially when
  one depends on another or they share mutable outputs.
- Inspect commands for side effects before running them. Keep temporary files
  and test data outside the repository where practical. Use ignored build
  locations for ordinary project tooling.
- Keep credentials, private data, and secrets out of patches, logs, screenshots,
  and handoffs. Use documented environment variable names and test fixtures
  to diagnose configuration. Route access to protected resources, destructive
  operations, and changes to external state through the Orchestrator.
- Leave staging, commits, pushes, publishing, deployment, and further delegation
  to the Orchestrator. Preserve unrelated files and Git state.

## Testing and verification

- For a behavior change with a meaningful deterministic test, prefer to
  reproduce the failure through a normal entry point before implementing the
  fix. Where a regression test is needed, capture its expected failure and
  rerun it after the fix. Check affected existing behavior before handing off.
- For documentation, tooling, or behavior that lacks a meaningful test-first
  case, choose observable functional or structural checks. Report the evidence
  you observed.
- Run focused checks first, then the applicable checks in the
  [Testing directives](TESTING.md) and those requested by the Orchestrator.
  Report the exact command or browser steps and the observed result. On a
  correction round, rerun the reported reproduction and nearby regression
  checks.
- Investigate failures within scope. Distinguish a change-caused failure from
  a demonstrated baseline or environment issue. Report any required check
  that is failing or still unverified, with the reason and what would unblock it.
- Before handing off, review the diff and `git status --short` for unrelated
  edits and temporary artifacts. Identify any scratch paths that still need
  cleanup.

## Handoff to the Orchestrator

Include the following in a concise report.

- **Status** — `READY_FOR_REVIEW`, `INCOMPLETE`, or `BLOCKED`.
- **Changes** — What changed, why, and the affected repository paths.
- **Verification** — Exact commands or steps and their observed results.
  Include before-and-after evidence when a failure was reproduced.
- **Review focus** — Acceptance criteria, affected behaviors, and setup for
  independent review.
- **Open items** — Remaining failures, unverified checks, or risks. For a
  blocker, name the missing prerequisite or the decision needed and give
  concrete options where available.
