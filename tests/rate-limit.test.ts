import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter, clientIpFrom } from "../src/lib/rate-limit";

test("allows up to the limit within one window", () => {
  const limiter = createRateLimiter({ limit: 5, windowMs: 60_000 });
  const t0 = 1_000_000;
  for (let i = 0; i < 5; i++) {
    assert.equal(limiter.check("1.2.3.4", t0 + i).allowed, true, `request ${i + 1} should pass`);
  }
});

test("blocks the request after the limit with a Retry-After hint", () => {
  const limiter = createRateLimiter({ limit: 5, windowMs: 60_000 });
  const t0 = 1_000_000;
  for (let i = 0; i < 5; i++) limiter.check("1.2.3.4", t0);
  const blocked = limiter.check("1.2.3.4", t0 + 1_000);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds >= 1 && blocked.retryAfterSeconds <= 60);
});

test("keys are rate-limited independently", () => {
  const limiter = createRateLimiter({ limit: 2, windowMs: 60_000 });
  const t0 = 0;
  limiter.check("a", t0);
  limiter.check("a", t0);
  assert.equal(limiter.check("a", t0).allowed, false);
  assert.equal(limiter.check("b", t0).allowed, true);
});

test("window resets after windowMs", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
  const t0 = 0;
  assert.equal(limiter.check("x", t0).allowed, true);
  assert.equal(limiter.check("x", t0 + 59_999).allowed, false);
  assert.equal(limiter.check("x", t0 + 60_000).allowed, true);
});

test("tracked keys are capped so spoofed IPs cannot grow memory unbounded", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 100 });
  for (let i = 0; i < 1_000; i++) {
    assert.equal(limiter.check(`spoof-${i}`, 0).allowed, true);
  }
});

test("clientIpFrom prefers first x-forwarded-for hop", () => {
  assert.equal(
    clientIpFrom(new Headers({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" })),
    "203.0.113.9"
  );
  assert.equal(clientIpFrom(new Headers({ "x-real-ip": "198.51.100.2" })), "198.51.100.2");
  assert.equal(clientIpFrom(new Headers()), "unknown");
});
