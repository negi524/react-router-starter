import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // see: https://ja.vite.dev/config/
  // `mode` に基づいて現在の作業ディレクトリーにある env ファイルをロードする。
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      port: Number(env.VITE_EXPOSE_PORT) || 5173,
    },
    // Vite 8 はネイティブで tsconfig の paths 解決をサポートするため、
    // vite-tsconfig-paths プラグインの代わりに resolve.tsconfigPaths を使う。
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [tailwindcss(), reactRouter()],
  };
});
