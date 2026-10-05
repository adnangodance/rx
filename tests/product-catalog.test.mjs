import assert from "node:assert/strict";
import test from "node:test";
import { filterProducts, productFormat } from "../lib/product-catalog.ts";

const products = [
  { name: "Amino-Quad Capsules", detail: "THE / INO / PRO / TAU", type: "jar" },
  { name: "NAD+ Injection", detail: "20mg/ml provider-guided care", type: "vial" },
  { name: "Beta Glucan", detail: "Daily immune wellness support", type: "jar" },
  { name: "GHK-Cu Cream", detail: "Peptide skin support", type: "jar" },
];

test("format filters distinguish treatments sharing the same source-image type", () => {
  assert.equal(productFormat(products[0]), "Capsules");
  assert.equal(productFormat(products[2]), "Drops & sprays");
  assert.equal(productFormat(products[3]), "Topicals");
  assert.deepEqual(filterProducts(products, "", "Injectables"), [products[1]]);
});

test("search matches product names and details while respecting the selected filter", () => {
  assert.deepEqual(filterProducts(products, "  NAD+  ", "All"), [products[1]]);
  assert.deepEqual(filterProducts(products, "Peptide", "Topicals"), [products[3]]);
  assert.deepEqual(filterProducts(products, "Peptide", "Capsules"), []);
  assert.deepEqual(filterProducts(products, "missing treatment", "All"), []);
  assert.deepEqual(filterProducts(products, "   ", "All"), products);
});
