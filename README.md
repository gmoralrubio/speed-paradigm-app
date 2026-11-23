# Speed Paradigm App

A Next.js project built and reviewed with three Codex agents.

## Local development

Use Node.js 22.22.2 or later on the 22.x line, 24.15.0 or later on the 24.x
line, or Node.js 26 or newer.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Run `pnpm build` for a production build and TypeScript validation.

## Testing

Use `pnpm test` to run the Vitest suite once and `pnpm test:watch` to rerun
tests as files change. Component tests that need a DOM use the
`// @vitest-environment jsdom` directive.

After a local `pnpm install`, Husky runs `pnpm lint` and `pnpm test` before
each commit. Either command can block the commit. Run `pnpm prepare` to
reinstall the hook if needed.

## Deployment

Follow the [production verification guide](docs/release.md) after deploying.
