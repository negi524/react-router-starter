# 概要

このアプリケーションは、ReactRouterのテンプレートアプリケーションです。
ReactRouterの基本的な実装を導入・検証し、新たなアプリケーションを作成するときに少ない労力で作成できるようにします。

## 機能

- 基本的なReactRouterのルーティング
- サインイン、サインアウト
- セッション管理
- エラーハンドリング

## 技術スタック

- 言語: TypeScript 5.x
- フレームワーク: React Router 7.x
- UI: TailwindCSS
- テストツール: Vitest
- 日時操作ライブラリ: date-fns

## ディレクトリ構成

```
.react-router/  # 型定義が生成されるディレクトリ
app/
  routes/ # ファイルルーティングの規則に従ったルーティングファイル
  detail.$id/route.tsx  # リクエストパラメータの処理方法が理解できるようなテンプレート
  mypage/route.tsx      # サインインした場合に表示できるマイページ
  signin/route.tsx      # サインインページ
  signout/route.tsx     # サインアウトページ
sessions.server.ts      # セッション管理を行う
public/                 # 静的コンテンツ
test/                   # テストコード
```
