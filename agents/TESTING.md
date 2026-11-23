# Testing directives

Develop must follow the applicable directives below. Testing independently
verifies them and the acceptance criteria supplied by the Orchestrator.

## Acceptance checks

- **Correctness.** Verify changed behavior through its normal entry point.
  Cover the normal path and relevant empty, invalid, and error cases. Confirm
  directly affected existing behavior still works.
- **Next.js and TypeScript.** Verify behavior against the installed framework
  docs where relevant. For application changes, run `pnpm lint` and
  the production build listed in [AGENTS.md](../AGENTS.md).
- **Automated tests.** Run `pnpm test` for changes that affect the application
  or the test suite. Use the [Vitest skill](../.agents/skills/vitest/SKILL.md)
  for test configuration and patterns.
- **UI.** Exercise changed flows in a browser at desktop and mobile sizes.
  Check keyboard access, visible focus, control labels, and user-facing states.
  Use the `web-design-guidelines` skill in `.agents/skills/` at the repository
  root for interface reviews.
- **Data and secrets.** For database changes, verify the app reads the expected
  records from the configured database. Check that anonymous access is limited
  to the intended public reads and that credentials stay out of tracked files,
  logs, and client bundles where privileged credentials could be exposed.
  Use non-production data to verify write restrictions.
- **Release.** When reviewing a deployment, follow the
  [production verification guide](../docs/release.md).

## Review and recheck

Review the assigned candidate and run the applicable checks yourself. Derive
browser and data checks from the acceptance criteria. Leave application fixes
to Develop. For each finding, report the affected criterion, file and line
when available, reproduction steps or failing command, and expected and
observed behavior.

Return a verdict with the exact checks run and their observed results:

- `PASS` when all applicable directives and task criteria are verified.
- `CHANGES_REQUIRED` when any criterion fails, with actionable findings.
- `BLOCKED` when a prerequisite prevents a required check. Name the missing
  prerequisite and the checks that remain unverified. Include any findings
  you were able to confirm.

On each recheck, reproduce the reported failures on the updated candidate and
verify directly affected behavior before issuing a new verdict.
