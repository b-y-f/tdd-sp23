import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

/**
 * Plan: For this excercise with zero initial test, I need to write
 * some tests to make sure the basic function are good to use, to
 * measure how much test I write, coverage testing tool will be needed.
 * Then slowly refactor the code and keep all the test pass, in
 * the end, we will have a good shape of the code. Then we can
 * write some test for the new features, and do the red, green
 * light testing.
 */
describe("Gilded Rose", () => {
  it("Hello world test!", () => {
    expect(updateTest("foo", 10, 0)).to.equal("foo 9 0");
  });

});

function updateTest(name, sellIn, quality) {
  const gildedRose = new Shop([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  return items[0].toString();
}

