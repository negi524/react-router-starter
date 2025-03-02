import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      include: ["app/**"], // 対象はappディレクトリ配下
      reporter: ["text", "json", "json-summary", "html"],
    },
  },
});
