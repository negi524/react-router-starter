import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.argv[1]?.includes("storybook");

export default defineConfig({
  plugins: [tailwindcss(), !isStorybook && reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      enabled: true, // UIで閲覧するため
      include: ["app/**"], // 対象はappディレクトリ配下
      reporter: ["text", "json", "json-summary", "html"],
    },
  },
});
