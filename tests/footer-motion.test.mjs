import assert from "node:assert/strict";
import test from "node:test";
import { footerRevealOffset } from "../lib/footer-motion.ts";

test("the wordmark is fully revealed when its stage is visible and stays bounded outside the viewport", () => {
  assert.equal(footerRevealOffset(900, 250, 900), 200);
  assert.equal(footerRevealOffset(650, 250, 900), 0);
  assert.equal(footerRevealOffset(-500, 250, 900), 0);
  assert.equal(footerRevealOffset(1500, 250, 900), 200);
  assert.ok(Number.isFinite(footerRevealOffset(0, 0, 0)));
});

test("desktop and mobile reveals progress smoothly in both scroll directions", () => {
  for (const height of [65, 250]) {
    let previous = 200;
    for (let step = 0; step <= 100; step++) {
      const top = 900 - height * step / 100;
      const offset = footerRevealOffset(top, height, 900);
      assert.ok(offset >= 0 && offset <= previous);
      assert.ok(previous - offset < 5);
      previous = offset;
    }
    assert.equal(previous, 0);
    assert.ok(footerRevealOffset(900 - height / 4, height, 900) > footerRevealOffset(900 - height * 3 / 4, height, 900));
  }
});
