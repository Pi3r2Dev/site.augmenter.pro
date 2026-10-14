import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Prototypes de design (HTML/CSS/JS livrés par Claude Design) : jamais
    // bundlés, en partie gitignorés — leur lint n'apprend rien sur le site.
    "docs/**",
  ]),
]);

export default eslintConfig;
