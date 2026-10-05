import assert from "node:assert/strict";
import test from "node:test";
import { sectionRevealFrame } from "../lib/section-reveal.ts";

test("the rounded panel expands to full width and reverses on scroll back", () => {
  const start = sectionRevealFrame(900, 900);
  const middle = sectionRevealFrame(300, 900);
  const end = sectionRevealFrame(-315, 900);
  assert.equal(start.scale, .84);
  assert.equal(start.radius, 52);
  assert.equal(end.scale, 1);
  assert.equal(end.radius, 0);
  assert.equal(end.shadow, 0);
  assert.ok(middle.scale > start.scale && middle.scale < end.scale);
  assert.ok(middle.radius > end.radius && middle.radius < start.radius);
  assert.deepEqual(sectionRevealFrame(300, 900), middle);
  assert.deepEqual(sectionRevealFrame(2000, 900), start);
  assert.deepEqual(sectionRevealFrame(-2000, 900), end);
});

test("the entrance stays continuous and mobile text gets gentler scaling", () => {
  let previous = sectionRevealFrame(900, 900);
  for (let top = 880; top >= -320; top -= 20) {
    const current = sectionRevealFrame(top, 900);
    assert.ok(current.scale >= previous.scale && current.scale <= 1);
    assert.ok(current.radius <= previous.radius && current.radius >= 0);
    assert.ok(Math.abs(current.scale - previous.scale) < .01);
    previous = current;
  }
  assert.ok(sectionRevealFrame(700, 700, true).scale > sectionRevealFrame(700, 700).scale);
  assert.equal(sectionRevealFrame(700, 700, true).radius, 28);
  for (const value of Object.values(sectionRevealFrame(0, 0))) assert.ok(Number.isFinite(value));
});
