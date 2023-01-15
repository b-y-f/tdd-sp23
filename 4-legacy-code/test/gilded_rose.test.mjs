import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

/**
 * Plan: For this excercise with zero initial test, I need to write 
 * some tests to make sure the basic function are good to use, 
 * then slowly refactor the code and keep all the test pass, in
 * the end, we will have a good shape of the code. Then we can
 * write some test for the new features, and do the red, green 
 * light testing.
 */
describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });
});
