import { build } from "esbuild";
import copy from "esbuild-plugin-copy";

try {
  await build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outdir: "./dist/",
    sourcemap: true,
    minify: true,
    conditions: ["worker", "browser"],
    outExtension: { ".js": ".mjs" },
    format: "esm",
    target: "esnext",
  });
} catch (err) {
  process.exitCode = 1;
}
