# ルート一覧と仕様

## ルート

| パス | ファイル | 認証 | 概要 |
|---|---|---|---|
| `/` | `routes/index.tsx` | 不要 | トップページ |
| `/signin` | `routes/signin.tsx` | 不要（サインイン済みなら `/mypage` へリダイレクト） | サインインフォーム |
| `/signout` | `routes/signout.tsx` | 不要 | サインアウト処理 |
| `/mypage` | `routes/mypage.tsx` | **必要** | マイページ（userId 表示） |
| `/sample` | `routes/sample.tsx` | 不要 | サンプルページ |
| `/detail` | `routes/detailList.tsx` | 不要 | 詳細一覧ページ |
| `/detail/:id` | `routes/detail.tsx` | 不要 | 詳細ページ |
| `/edit` | `routes/edit.tsx` | 不要 | 編集画面（beforeunload ダイアログあり） |

## 認証仕様

- username と password が**両方**入力されていればサインイン成功（値は何でもよい）
- 失敗時: `「ユーザー名/パスワードが無効です」` がページに表示される
- セッションはクッキーで管理

## 各ページの主要要素（セレクタ参考）

### `/signin`
- `input[name="username"]` — ユーザー名
- `input[name="password"]` — パスワード
- `button` — 送信ボタン（テキスト: 送信）
- `.text-red-600` — エラーメッセージ

### `/mypage`
- `h1` — 「This is MyPage.」
- `p` — 「Your id is 「{userId}」」

### `/edit`
- `textarea[name="message"]` — テキストエリア
- `a[href="/"]` — Home リンク
- `beforeunload` イベント — ページ離脱時にダイアログが発火

## ローカル開発 URL

```
http://localhost:5173
```
