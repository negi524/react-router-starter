import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

import jsxA11Y from "eslint-plugin-jsx-a11y";
import * as importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   includeIgnoreFile(gitignorePath),
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//   },
//   { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  importPlugin.flatConfigs?.recommended,
  {
    name: "base-setting",
    files: ["**/*"],
    ignores: ["eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        // TODO: あったほうが良いか検証する
        // ...globals.es2015,
      },
    },
  },
  {
    name: "react-setting",
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    ...jsxA11Y.flatConfigs.recommended,
    ...reactHooks.configs["recommended-latest"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ...pluginReact.configs.flat["jsx-runtime"].languageOptions,
      ...jsxA11Y.flatConfigs.recommended.languageOptions,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },
  {
    name: "typescript-setting",
    files: ["**/*.{ts,tsx}"],
    settings: {
      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        },
      },
    },
  },
  {
    name: "node",
    files: ["eslint.config.mjs"],
  },
);
