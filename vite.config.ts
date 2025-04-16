import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // see: https://ja.vite.dev/config/
  // `mode` に基づいて現在の作業ディレクトリーにある env ファイルをロードする。
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      port: env.VITE_EXPOSE_PORT,
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  };
});
