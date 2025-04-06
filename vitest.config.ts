import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      include: ["app/**"],
      reporter: ["text", "json", "json-summary", "html"],
    },
  },
});
