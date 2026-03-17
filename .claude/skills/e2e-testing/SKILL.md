---
name: e2e-testing
description: |
  Chrome DevTools MCP を使ってこのプロジェクトのローカル環境（http://localhost:5173）を
  ブラウザ操作で動作確認するスキル。Playwright 等のインストール不要。
  以下の場面で使用:
  - 「E2Eテストして」「動作確認して」「ブラウザで確認して」
  - サインイン・サインアウト・認証フローの確認
  - フォーム操作・ページ遷移・ダイアログの確認
  - 「画面を確認して」「実際に動かして確認して」と言われた場合
---

# E2E 動作確認（Chrome DevTools MCP）

## 前提

- ローカルサーバーが起動していること: `pnpm dev` → `http://localhost:5173`
- Chrome DevTools MCP が接続済みであること

## 基本フロー

1. `mcp__chrome-devtools__list_pages` でページ一覧を確認
2. 既存ページがあれば `mcp__chrome-devtools__select_page` で選択、なければ `mcp__chrome-devtools__new_page` で新規作成
3. `mcp__chrome-devtools__navigate_page` でページを開く
4. 操作・確認: `fill` → `click` → `take_screenshot` の順で実施
5. 確認後に `mcp__chrome-devtools__take_screenshot` でスクリーンショットを撮って結果を報告

## よく使うツール

| ツール | 用途 |
|---|---|
| `navigate_page` | URL を開く |
| `fill` | input / textarea に値を入力 |
| `click` | 要素をクリック |
| `take_screenshot` | 現在の画面を撮影 |
| `wait_for` | 要素の出現・URLの変化を待つ |
| `evaluate_script` | JS を実行（セッション確認・イベント発火など） |
| `handle_dialog` | beforeunload / alert などのダイアログを処理 |
| `get_console_message` | コンソールエラーの確認 |

## 確認シナリオ例

### サインインフロー
1. `/signin` を開く
2. username / password を入力して送信
3. `/mypage` にリダイレクトされることを確認
4. スクリーンショットで userId 表示を確認

### 編集画面の離脱ダイアログ
1. `/edit` を開く
2. textarea に入力する
3. `handle_dialog` を設定してから Home リンクをクリック
4. ダイアログが発火することを確認

## ルート・認証仕様

詳細は [references/routes.md](references/routes.md) を参照。
