import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "*.sh"]),
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      jsdoc: jsdoc,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".json"],
        },
      },
      jsdoc: {
        mode: "jsdoc",
      },
    },
    rules: {
      // Basic javascript rules
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      
      // Reglas de React
      "react/prop-types": "off", // Desactivado ya que se usa JSDoc para documentar props
      "react/react-in-jsx-scope": "off", // No es necesario en React 17+
      "react/jsx-key": "error",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/self-closing-comp": "error",
      "react/jsx-pascal-case": "error",
      
      // Reglas de Hooks de React
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Reglas de accesibilidad
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/no-redundant-roles": "error",
      
      // Reglas de importación
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "pathGroups": [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
      
      // Reglas de JSDoc
      "jsdoc/require-jsdoc": ["error", {
        "require": {
          "ArrowFunctionExpression": true,
          "ClassDeclaration": true,
          "FunctionDeclaration": true,
          "MethodDefinition": true,
        },
      }],
      "jsdoc/require-description": "error",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",
      
      // Estilo
      "semi": ["error", "always"],
      "quotes": ["error", "double", { avoidEscape: true }],
      "arrow-spacing": ["error", { before: true, after: true }],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["warn", { code: 120, ignoreComments: true, ignoreStrings: true }],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    },
  },
  
  // Reglas específicas para archivos de componentes
  {
    files: ["**/components/**/*.{js,jsx}"],
    rules: {
      // Reglas más estrictas para componentes
      "jsdoc/require-param-description": "error",
      "jsdoc/require-returns-description": "error",
    },
  },
  
  // Configuración específica para archivos de configuración
  {
    files: ["*.config.{js,jsx}"],
    rules: {
      "no-console": "off",
    },
  },
]);
