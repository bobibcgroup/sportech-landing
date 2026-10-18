import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Finding 5: the language auto-detect must never ship the visitor's IP to a
// third-party geolocation service. Detection must stay local to the browser.
test("language detection makes no third-party network calls (finding 5)", () => {
  const source = readFileSync(
    join(__dirname, "../src/lib/language-context.tsx"),
    "utf8"
  );
  assert.ok(!source.includes("ipapi"), "ipapi.co geolocation call must be removed");
  assert.ok(
    !/fetch\s*\(\s*["'`]https?:/.test(source),
    "language context must not fetch any external URL"
  );
  assert.ok(
    source.includes("navigator.language"),
    "expected local browser-language detection as the replacement"
  );
});
