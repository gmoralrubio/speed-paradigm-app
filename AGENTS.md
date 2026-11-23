# Speed Paradigm App

This Next.js and TypeScript project is a practical exercise in building and reviewing an application with three Codex agents.

- Write application code in TypeScript (`.ts` or `.tsx`).
- Use pnpm. Run `pnpm typecheck` to check types without a production build.
- Run `pnpm build` for the production build and TypeScript validation.
- For application changes, follow the [three-agent workflow](docs/agent-workflow.md).

## Task guides

- [Implementation](agents/DEVELOP.md)
- [Testing and review](agents/TESTING.md)
- [Production verification](docs/release.md)
- [Advanced TypeScript types](.agents/skills/typescript-advanced-types/SKILL.md) for complex types and reusable type utilities.
- [Clean Code](.agents/skills/clean-code/SKILL.md) for implementation and refactoring guidance.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
