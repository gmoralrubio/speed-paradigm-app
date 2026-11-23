# Testing directives

Independently verify the work assigned by the [Orchestrator](../AGENTS.md).
Develop must follow the applicable acceptance checks below and report any it
could not verify.
Testing reports findings to the Orchestrator, who routes corrections to Develop
and assigns the recheck.

## Review the candidate

1. Read the request, assigned acceptance criteria, relevant project guidance,
   changed files, and Develop's handoff. Compare the diff with the task scope.
2. Derive your own checks from each criterion. Use the normal application
   entry point and cover the expected path, relevant boundary values, and
   invalid or failing paths. Check behavior that shares the changed logic.
3. Where a change writes data, verify that rejected inputs and failed operations
   preserve the expected state. Exercise affected interactions across features
   when data flows through more than one entry point.
4. Run the applicable checks yourself. Use Develop's results as supporting
   evidence. Confirm observed failures directly and compare against the
   baseline when practical to establish whether they are regressions. Where
   Develop reports before-and-after test evidence, verify that it covers the
   intended failure.
5. Account for every in-scope criterion with a pass, a failure, or an explicit
   reason it could not be verified. For a reproducible regression that warrants
   a lasting test, suggest the assertion and test location in the handoff.

## Acceptance checks

- **Next.js and TypeScript.** Verify version-specific behavior against the
  installed framework docs where relevant. For application changes, run
  `pnpm lint` and the production build listed in [AGENTS.md](../AGENTS.md).
- **Automated tests.** Run `pnpm test` for changes affecting the application
  or the test suite. Use the [Vitest skill](../.agents/skills/vitest/SKILL.md)
  for test configuration and patterns.
- **Pre-commit.** When changing the [Husky hook](../.husky/pre-commit) or its
  setup, run `git hook run pre-commit` to exercise lint and tests. Verify in
  a temporary repository that a failure in either check blocks the commit.
- **UI.** Exercise changed flows in a browser at desktop and mobile sizes.
  Check keyboard access, visible focus, control labels, and user-facing states.
  Use the [Web Interface Guidelines skill](../.agents/skills/web-design-guidelines/SKILL.md)
  for interface reviews.
- **Data and secrets.** For database changes, verify the app reads the expected
  records from the configured database, anonymous access permits only the
  intended public reads, and privileged credentials stay out of tracked files,
  logs, and client bundles. Verify write restrictions using non-production data.
- **Release.** For deployment reviews, follow the
  [production verification guide](../docs/release.md).

## Workspace and test isolation

- Leave tracked and untracked project files and Git state untouched. Run
  ordinary checks that only write expected ignored tooling outputs, such as
  `.next/`. Leave fixes, dependency changes, and further delegation to the
  Orchestrator and Develop.
- Use disposable fixtures, test databases, or a temporary repository for
  probes that mutate state. If you need a scratch copy, use a fresh system
  temporary directory and copy only what the probe requires. Exclude secrets,
  local environment files, and Git metadata from copies.
- Check `git status --short` before and after verification. Report any
  unexpected mutation and identify remaining scratch paths. Send requests for
  permissions or unavailable infrastructure to the Orchestrator.

## Findings and recheck

Treat unmet criteria and regressions caused by the change as findings. Report
unrelated, pre-existing issues separately, with evidence and any relevance to
the task. For each finding, include the affected criterion, `path:line` when
available, reproduction steps or the exact failing command, and expected and
observed behavior.

Return a concise handoff with the verdict, evidence for each acceptance
criterion, exact checks run and their observed results, and any findings or
unverified checks.

- `PASS` when all applicable criteria and required checks are verified.
- `CHANGES_REQUIRED` when one or more criteria fail. Include actionable findings.
- `BLOCKED` when a missing prerequisite prevents required verification. Name
  the prerequisite and the checks it blocks. Include any confirmed findings.

On recheck, verify the reported failures against the updated candidate and
check the directly affected behavior for regressions. Expand the recheck when
the correction changes additional behavior.
