import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import nextConfig from "../next.config";

const ROOT = join(__dirname, "..");

test("next.js version is outside all advisory ranges (findings 1–3)", () => {
  // GHSA-2xp9-vwfh-vxw4 fixed in 16.3.3, CVE-2026-44578 in 16.2.5,
  // CVE-2026-94483 in 16.3.8 — so anything >= 16.3.8 clears all three.
  const pkg = JSON.parse(
    readFileSync(join(ROOT, "node_modules/next/package.json"), "utf8")
  ) as { version: string };
  const [major, minor, patch] = pkg.version.split(".").map(Number);
  const atLeast = (a: number, b: number, c: number) =>
    major > a || (major === a && (minor > b || (minor === b && patch >= c)));
  assert.ok(
    atLeast(16, 3, 8),
    `installed next ${pkg.version} is inside a known-vulnerable range (< 16.3.8)`
  );
});

test("security headers are applied to every route (finding 6)", async () => {
  const rules = await nextConfig.headers!();
  const catchAll = rules.find((r) => r.source === "/(.*)");
  assert.ok(catchAll, "expected a catch-all headers rule");

  const keys = new Map(catchAll.headers.map((h) => [h.key.toLowerCase(), h.value]));
  for (const required of [
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "referrer-policy",
    "permissions-policy",
    "strict-transport-security",
  ]) {
    assert.ok(keys.has(required), `missing ${required}`);
  }

  const csp = keys.get("content-security-policy")!;
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /object-src 'none'/);
  assert.equal(keys.get("x-content-type-options"), "nosniff");
});

test("X-Powered-By disclosure is disabled (finding 6)", () => {
  assert.equal(nextConfig.poweredByHeader, false);
});
