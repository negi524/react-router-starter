# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

React Router v8 のフレームワークモード（SSR有効）を使ったスターター/テンプレートアプリ。基本的なルーティング、Cookieセッションによるサインイン/サインアウト、エラーハンドリングの実装パターンを検証・提供することが目的。新規アプリ作成時の土台として使う。

## コマンド

パッケージマネージャーは **pnpm**（Node `>=26.4.0` / pnpm `>=11`、`mise.toml` でバージョン固定）。

```bash
pnpm install                 # 依存関係インストール
cp .env.example .env.development   # 初回の環境構築（必須。SESSION_SECRET 等を含む）

pnpm run dev                 # 開発サーバー（HMR有効）。http://localhost:5173
pnpm run build               # 本番ビルド → build/{client,server}
pnpm run start               # ビルド済み成果物をサーブ

pnpm run typecheck           # react-router typegen + tsc。型エラー確認はこれ
pnpm run lint                # ESLint（キャッシュあり）
pnpm run format              # Prettier で app/ と eslint.config.mjs を整形

pnpm run test                # Vitest（watch）
pnpm run test:coverage       # カバレッジ付きで1回実行（CIと同じ）
pnpm run test:ui             # Vitest UI
pnpm exec vitest run test/services/calcService.test.ts   # 単一テスト実行
```

`mise run check` で typecheck → format → lint → test:coverage → build を一括実行できる。

CI（`.github/workflows/test.yml`）は main 向けPRで `lint` / `test:coverage` / `build` を実行する。

## アーキテクチャ

### ルーティング（設定ベース、ファイルベースではない）

ルートは `app/routes.ts` で **明示的に定義**する（Remix風のファイル名規約による自動ルーティングではない）。新しい画面を追加するときは、このファイルに `route()` / `index()` / `layout()` を追記する。

- `index("./routes/index.tsx")` … `/`
- `layout("./routes/layout/authLayout.tsx", [...])` … 認証ガード付きの子ルートをネスト
- `route("detail/:id", "./routes/detail.tsx")` … 動的パラメータ

### 型の自動生成（重要）

各ルートの型は React Router が `.react-router/types/` に生成する。ルートファイル内では必ずその固有型をインポートする:

```tsx
import type { Route } from "./+types/detail";  // routes/detail.tsx の場合
// loader/action/component は Route.LoaderArgs, Route.ComponentProps 等を使う
```

`./+types/...` が見つからない・型が古い場合は `pnpm run typecheck`（内部で `react-router typegen`）を実行して再生成する。

### 認証・セッション

- `app/sessions.server.ts` … `createCookieSessionStorage` で Cookie ベースのセッションを定義。`SessionData.userId` を保持し、`__session` Cookie は `httpOnly` / `secure` / `sameSite: strict`、有効期限3分。`secrets` は `process.env.SESSION_SECRET`。
- 認証ガードは `app/routes/layout/authLayout.tsx` の `loader` で行う。`userId` が無ければ `/signin` へ `redirect`。保護したい画面はこの layout の子ルートとして `routes.ts` に追加する。
- サインインは `app/routes/signin.tsx` の `action` で `session.set("userId", ...)` → `commitSession` で Cookie を返す。失敗時は `session.flash("error", ...)` でフラッシュメッセージ。

### ミドルウェア

`app/root.tsx` で `middleware = [loggingMiddleware]` を登録。`app/middleware/loggingMiddleware.server.ts` は `next()` 前後でリクエスト情報（method/path/status/duration/ip/userId）を pino で構造化ログ出力する。`*.server.ts` はサーバー専用モジュール。

ロガーは `app/config/logger.ts` の pino インスタンスを `~/config/logger` からインポートして使う。

### エラーハンドリング

- ルートで発生したエラーは、原則そのファイルの `ErrorBoundary` で処理を完結させる。`app/root.tsx` のグローバル `ErrorBoundary` は最後の砦。
- `loader` / `action` 内でのエラーは `react-router` の `data` を **throw** してステータスとメッセージを設定する: `throw data<string>("不正なパラメータです", { status: 400 })`。
- `ErrorBoundary` では `isRouteErrorResponse(error)` で `data` throw 由来のエラー（`BasicError`）と未捕捉エラー（`UnknownError`）を分岐する。共通コンポーネントは `app/components/error/`。

## コーディング規約

- **関数型アプローチ**: 純粋関数を優先、変数は原則イミュータブル、副作用を分離、型安全性を確保。
- パスエイリアス `~/*` → `app/*`（tsconfig / vitest 双方で設定済み）。
- 修正後は `pnpm run typecheck` を実行してエラーを確認する。
- 環境変数は `.env.example` を基準とし、新しい変数を足すときは `.env.example` も更新する。

## テスト

Vitest（`globals: true`、エイリアス `~` → `app`）。テストは `test/` 配下にソース構造をミラーして配置（例: `app/services/calcService.ts` → `test/services/calcService.test.ts`）。カバレッジ対象は `app/**`。

## 技術スタック補足

React 19 / React Router v8 / TailwindCSS v4（`@tailwindcss/vite` プラグイン、`app/app.css`）/ TypeScript 6 / Vite 8（`resolve.tsconfigPaths: true` でネイティブに paths 解決、`vite-tsconfig-paths` プラグインは不要）/ pino。
</content>
</invoke>
