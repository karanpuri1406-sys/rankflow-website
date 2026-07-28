import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

/* eslint-config-next v15 still ships eslintrc-style configs (it loads
   @rushstack/eslint-patch, which targets ESLint 8). This project runs ESLint 9
   flat config, so the two formats can't be combined directly — importing
   core-web-vitals.js and spreading it throws "nextVitals is not iterable",
   and passing it through as-is fails with 'Plugin "" not found'.

   FlatCompat is the supported bridge, and is what create-next-app generates
   for Next 15 on ESLint 9. */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
