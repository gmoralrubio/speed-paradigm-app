# Pull request workflow

Use a short-lived branch from the latest `origin/main` for each pull request.
Keep each PR focused on one change that can be reviewed and merged on its own.
Use a descriptive branch name such as `feat/trail-filters` or `fix/trail-details`.

## Open the PR

1. The Orchestrator defines the scope and acceptance criteria, then assigns
   the task to Develop through the [three-agent workflow](agent-workflow.md).
2. Develop implements the change and reports the checks it ran. The
   Orchestrator creates the commits, pushes the working branch, and opens a
   PR targeting `main` when authorized.
3. Use a Conventional Commits title in English, such as
   `feat(trails): add difficulty filters`. Fill in the PR template with the
   scope, acceptance criteria, and observed verification results. Open as a
   draft if implementation or verification is still pending.

## Review the PR

Testing independently reviews the candidate and returns `PASS`,
`CHANGES_REQUIRED`, or `BLOCKED`. Record the reviewed commit SHA, verdict,
and verification evidence in the PR. For application changes, the usual
checks are `pnpm lint`, `pnpm test`, and `pnpm build`, plus any relevant
browser or data checks in the [Testing directives](../agents/TESTING.md).

The Orchestrator sends findings to Develop and requests a recheck after
corrections. If the branch changes after a review, verify the updated
candidate and record the new SHA and verdict.

## Hand off the PR for merge

When Testing gives the current candidate `PASS` and any required checks are
green, the Orchestrator marks the PR ready and shares its URL and verification
results with the user. The agent workflow ends at that handoff. Only the user
performs the merge into `main` in GitHub. For **Squash and
merge**, use the PR's Conventional Commits title.

When the merge triggers a production deployment, follow the
[production verification guide](release.md) for the public URL.
