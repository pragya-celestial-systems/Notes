import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      indent: ["error", 2],
      eqeqeq: "error",
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-unused-vars": ["warn", { args: "none", ignoreRestSiblings: true }],
      quotes: ["error", "double", { avoidEscape: true }],
      "comma-dangle": ["error", "always-multiline"],
      semi: ["error", "always"],
      "no-var": "error",
      "object-curly-spacing": ["error", "always"],
      "max-len": ["warn", { code: 100 }],
    },
  },
];
