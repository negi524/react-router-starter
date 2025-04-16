import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
  test: {
    globals: true,
    coverage: {
      enabled: true,
      include: ["app/**"],
      reporter: ["text", "json", "json-summary", "html"],
    },
  },
});
