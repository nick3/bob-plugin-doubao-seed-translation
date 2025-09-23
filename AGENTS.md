# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all TypeScript sources; `main.ts` exposes the Bob translation entrypoints, while `adapter/` hosts service-specific clients derived from `adapter/base.ts`.
- Place shared helpers in `src/utils/` to keep adapters slim, and register new languages through `src/lang.ts` for a single source of truth.
- `public/` stores plugin metadata and assets bundled into the `.bobplugin`; update icons or `info.json` here before packaging.
- Build and packaging utilities live in `scripts/`; follow existing patterns when adding automation. Product docs and configuration manuals are under `docs/`—sync behaviour changes there.

## Build, Test, and Development Commands
- `bun run build` (invoked by `bun scripts/build.mts`) compiles TypeScript to `dist/main.js` and validates the bundle.
- `bun scripts/package.mts` runs a development build, zips `dist/` into `doubao-seed-translation-dev.bobplugin`, and opens the folder for manual installation into Bob.
- `bun scripts/package.mts release <version> "<desc>"` rebuilds, creates a release-ready archive, and refreshes `appcast.json`; use it when preparing tagged releases.
- `bun run lint` executes Biome across the workspace; prefer running this before pushing.

## Coding Style & Naming Conventions
- TypeScript is the source of truth; keep modules ESM-compliant and favour named exports for clarity. Use camelCase for functions/variables and PascalCase for adapter classes.
- Biome enforces space indentation and single quotes; run `bun run lint:fix` for format corrections instead of manual tweaks.
- Keep configuration constants near their consumers, but lift reusable validation into `src/utils/` with descriptive names (`ensureHttpsAndNoTrailingSlash`, etc.).

## Testing Guidelines
- No automated suite exists yet; when adding it, co-locate integration tests beside adapters (for example `src/adapter/openai.test.ts`) and execute them with Bun’s test runner.
- Until then, verify changes by installing the dev package in Bob and exercising key flows (validation, streaming, error handling) against mock or staging endpoints.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`type(scope): summary`); recent history includes `chore(deps)` and `refactor` messages.
- Squash minor fixups locally, link related issues in the PR description, and attach screenshots or console traces when UX-facing behaviour changes.
- Confirm lint passes and attach release notes snippets when modifying `appcast.json` or packaging scripts to ease reviewer context.

## Security & Configuration Tips
- Never commit API keys or Bob configuration exports; the plugin reads secrets at runtime via `$option`.
- Document new provider requirements in `docs/configuration_manual_EN.md` (and sync the CN variant) so users can configure endpoints safely.
