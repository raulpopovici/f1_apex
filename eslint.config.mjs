import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unused variable warnings
      "@typescript-eslint/no-unused-vars": "off",

      // Disable explicit any warnings
      "@typescript-eslint/no-explicit-any": "off",

      // Disable React hooks exhaustive deps warnings
      "react-hooks/exhaustive-deps": "off",

      // Disable unescaped entities in JSX
      "react/no-unescaped-entities": "off",

      // Disable other common warnings
      "prefer-const": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "off",
    },
  },
];

export default eslintConfig;
