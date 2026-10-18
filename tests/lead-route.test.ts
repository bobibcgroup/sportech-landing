import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/lead/route";

// Keep the webhook path inert so tests never hit the network.
delete process.env.LEAD_WEBHOOK_URL;

function leadRequest(ip: string, body: unknown = {
  name: "Test Person",
  club: "Test Club",
  email: "test@example.com",
}): Request {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

test("accepts a valid lead", async () => {
  const res = await POST(leadRequest("192.0.2.1"));
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.ok, true);
});

test("rejects an invalid body", async () => {
  const res = await POST(leadRequest("192.0.2.2", { name: "", club: "", email: "nope" }));
  assert.equal(res.status, 400);
});

test("floods from one IP are throttled with 429 + Retry-After (finding 4)", async () => {
  const statuses: number[] = [];
  let throttled: Response | null = null;
  for (let i = 0; i < 30; i++) {
    const res = await POST(leadRequest("192.0.2.66"));
    statuses.push(res.status);
    if (res.status === 429 && !throttled) throttled = res;
  }
  assert.ok(throttled, "expected at least one 429 among 30 rapid requests");
  assert.ok(Number(throttled.headers.get("retry-after")) >= 1, "429 must carry Retry-After");
  assert.ok(
    statuses.filter((s) => s === 200).length <= 5,
    `at most 5 of 30 flood requests may succeed, got ${statuses.filter((s) => s === 200).length}`
  );
});

test("a different IP is not affected by another IP's flood", async () => {
  for (let i = 0; i < 10; i++) await POST(leadRequest("192.0.2.77"));
  const res = await POST(leadRequest("192.0.2.78"));
  assert.equal(res.status, 200);
});
