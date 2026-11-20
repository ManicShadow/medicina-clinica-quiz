// Copiază site-ul static în dist/ (folderul publicat pe GitHub Pages)
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("src", "dist", { recursive: true });
writeFileSync("dist/.nojekyll", "");
console.log("Build gata în dist/");
