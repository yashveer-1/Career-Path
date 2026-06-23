import assert from "node:assert/strict";
import test from "node:test";
import jwt from "jsonwebtoken";
import { protect } from "../src/middleware/authMiddleware.js";

const SECRET = "test-secret-with-more-than-thirty-two-characters";

test("auth middleware accepts a valid bearer token", () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = SECRET;

  const token = jwt.sign({ id: "user-123" }, SECRET, {
    expiresIn: "7d",
    issuer: "pathfinder-api",
    audience: "pathfinder-client"
  });
  const request = { headers: { authorization: `Bearer ${token}` } };
  let nextError;

  protect(request, {}, (error) => {
    nextError = error;
  });

  assert.equal(nextError, undefined);
  assert.deepEqual(request.user, { id: "user-123" });
  process.env.JWT_SECRET = previousSecret;
});

test("auth middleware rejects a missing token", () => {
  let nextError;
  protect({ headers: {} }, {}, (error) => {
    nextError = error;
  });

  assert.equal(nextError.statusCode, 401);
  assert.match(nextError.message, /required/i);
});

test("auth middleware rejects an invalid token", () => {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = SECRET;
  let nextError;

  protect(
    { headers: { authorization: "Bearer definitely-not-a-token" } },
    {},
    (error) => {
      nextError = error;
    }
  );

  assert.equal(nextError.statusCode, 401);
  assert.match(nextError.message, /invalid|expired/i);
  process.env.JWT_SECRET = previousSecret;
});
