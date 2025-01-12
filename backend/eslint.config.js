import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
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
