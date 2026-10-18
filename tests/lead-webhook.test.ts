import { test, after } from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { POST } from "../src/app/api/lead/route";

function listen(server: Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve(typeof addr === "object" && addr ? addr.port : 0);
    });
  });
}

test("forwards name, organization, email to the webhook", async () => {
  const calls: Array<Record<string, unknown>> = [];
  const server = createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      calls.push(JSON.parse(raw) as Record<string, unknown>);
      res.writeHead(200).end("{}");
    });
  });
  after(() => server.close());

  const port = await listen(server);
  process.env.LEAD_WEBHOOK_URL = `http://127.0.0.1:${port}/webhook/new-contact`;
  try {
    const res = await POST(
      new Request("http://localhost/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "192.0.2.200",
        },
        body: JSON.stringify({
          name: "Webhook Test",
          club: "Test FC",
          email: "hook@example.com",
        }),
      })
    );

    assert.equal(res.status, 200);
    assert.deepEqual((await res.json()).forwarded, true);
    assert.equal(calls.length, 1, "webhook was never called");
    const received = calls[0];
    assert.equal(received.name, "Webhook Test");
    assert.equal(received.organization, "Test FC");
    assert.equal(received.email, "hook@example.com");
    assert.equal(received.source, "sportech.com.sa");
  } finally {
    delete process.env.LEAD_WEBHOOK_URL;
  }
});

test("a failing webhook never fails the visitor's submit", async () => {
  const server = createServer((req, res) => {
    res.writeHead(404).end('{"code":404}');
  });
  after(() => server.close());

  const port = await listen(server);
  process.env.LEAD_WEBHOOK_URL = `http://127.0.0.1:${port}/webhook/new-contact`;
  try {
    const res = await POST(
      new Request("http://localhost/api/lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "192.0.2.201",
        },
        body: JSON.stringify({
          name: "Fallback Test",
          club: "Test FC",
          email: "fallback@example.com",
        }),
      })
    );

    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.ok, true);
    assert.equal(json.forwarded, false);
  } finally {
    delete process.env.LEAD_WEBHOOK_URL;
  }
});
