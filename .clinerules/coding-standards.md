# 概要

このページでは、コーディング規約や実装方針に関するルールを記載する。

## 実装の進め方

- 修正を行った後は、`yarn typecheck`を実行し、エラーの原因を整理すること

## コーディング規約

### 関数型アプローチ

- 純粋関数を優先
- 変数は原則イミュータブル
- 副作用を分離
- 型安全性を確保

## 環境変数

- 環境変数は`.env.example`を参照すること
- リポジトリをクローンしたときに`cp .env.example .env.development`と実行することで環境構築できるようにすること

## Route型のインポート

`app/routes/product.tsx`というファイルで型をインポートする場合は、

```tsx
import type { Route } from "./+types/product";
```

という形式でそのルート固有の型をインポートすることが可能なので、これを利用すること。
もしこの型定義ファイルが見つからない場合は、`yarn typecheck`を実行することで生成可能である。

## エラーハンドリング

- ReactRouterの`ErrorBoundary`を使用してエラーをキャッチし、適切なエラーページを表示すること
- そのコンポーネントで発生したエラーは、原則そのファイルに記載されている`ErrorBoundary`で処理を完了させること
- エラーハンドリングが必要なファイルでは`react-router`ライブラリからインポート可能である`data`, `isRouteErrorResponse`を使用すること
- `loader`もしくは`action`関数でエラーが発生した場合、`data`をthrowすることで適切なステータスコードとメッセージを設定すること

### エラーハンドリングの例

```tsx
import { data, isRouteErrorResponse } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const num = Number(params.id);
  if (num < 0) {
    throw data<string>("不正なパラメータです", { status: 400 });
  }
  return {
    id: num,
  };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log({ error });
  if (isRouteErrorResponse(error)) {
    // 基本的なエラーページ
  } else {
    // 万が一エラーハンドリングが漏れた場合のページ
  }
}
```
