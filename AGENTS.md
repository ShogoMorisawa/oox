# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: Laravel 12 API with Vite/Tailwind assets. Source lives in `app/`, HTTP entry points in `routes/`, views/components in `resources/`, database layer in `database/` (migrations/seeders/factories), and tests in `tests/Feature` and `tests/Unit`. Local env config goes in `backend/.env`.
- `frontend/`: Next.js 16 app router under `frontend/app/` with shared styles/config in `frontend/*.config.*` and static assets in `frontend/public/`. Type definitions sit alongside components (`*.tsx`/`*.ts`).
- Generated build artifacts stay in `backend/public` and `frontend/.next`; keep them out of commits.

## API Roles
- `/api/calculate` (logic engine): Laravel receives the 28 matches from the user, runs graph-based reasoning (Tarjan-style) to derive `order` (序列と葛藤ブロック)。OoX Mirror の「脳」として矛盾のない結果を返す。
- `/api/describe` (AI gateway): Frontend sends the final snapshot, Laravel crafts a poetic prompt, forwards it to Gemini, and returns the generated prose without exposing the API key。複雑なデータを詩的な文章に翻訳して返す。

## Build, Test, and Development Commands
- Backend setup/build: `cd backend && composer setup` (installs PHP deps, copies `.env`, generates key, runs migrations, installs Node deps, builds assets). Use when bootstrapping a fresh workspace.
- Backend dev loop: `cd backend && composer run dev` (serves Laravel, queue listener, log tail, Vite). For a lighter loop, run `php artisan serve` and `npm run dev` separately.
- Backend tests: `cd backend && composer test` or `php artisan test`.
- Frontend dev: `cd frontend && npm install && npm run dev` (Next dev server on port 3000).
- Frontend build/lint: `cd frontend && npm run build` for production bundle, `npm run lint` for ESLint checks, `npm run start` to serve the built app.

## Coding Style & Naming Conventions
- PHP: Follow PSR-12/ Laravel defaults; 4-space indent. Run `./vendor/bin/pint` before committing. Classes/interfaces are PascalCase, methods/properties camelCase, migrations/table names snake_case. Keep controller/service boundaries thin and favor request validation.
- JS/TS: Align with the Next.js ESLint config (`npm run lint`). Components/hooks in PascalCase files, utilities in camelCase `*.ts`. Place server/client components explicitly and add `use client` only when needed. Prefer named exports and co-locate styles with components when scoped.

## Testing Guidelines
- Backend: Write feature tests for HTTP/queue flows in `tests/Feature` and unit tests for isolated logic in `tests/Unit`. Name files `SomethingTest.php`, rely on model factories, and wrap DB-heavy tests with transactions or refresh traits. Run `php artisan test` before pushing.
- Frontend: No test harness is preconfigured; if you add one, stick to Testing Library/Playwright and keep commands under `npm test`/`npm run e2e`. At minimum, keep ESLint clean and validate critical user flows manually when changing UI.

## Commit & Pull Request Guidelines
- Use concise, present-tense messages; prefer conventional prefixes seen in history (`feat`, `fix`, `chore`, etc.). Group related backend/frontend changes into separate commits when practical. Recommended format (title + bullet body):  
  `[docs] feat: ガイドラインにAPI役割とコミット例を追記`  
  `- AGENTS.mdに/api/calculateと/api/describeの役割を記載`  
  `- コミットメッセージの推奨形式（プレフィックス入りタイトル＋箇条書き説明）を明文化`
- PRs should include: scope summary, linked issue/reference, notes on migrations/infra (Serverless/Bref/AWS) if touched, and screenshots or curl examples for API/UI changes. Document new env vars in the description.
- Ensure `composer test`, `npm run lint`, and relevant builds pass for the area you touched. Avoid committing `.env` or other secrets; use examples/placeholders instead.
