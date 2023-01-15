import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";
import { verifyAsJSON } from "approvals";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  it("Test for empty items", () => {
    const empty = new Shop();
    const items = empty.updateQuality();
    expect(items.toString()).to.be.empty;
  });
});

describe("Approval Tests", () => {
  const names = ["foo", "Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"];
  const sellIns = [0, 1, -1];
  const qualities = [0, 50, 48];
  const paraCombs = cartesian(names, sellIns, qualities);

  const testResults = paraCombs.map(
    ([name, sellIn, quality]) => `[${name}, ${sellIn}, ${quality}] => ${updateTest(name, sellIn, quality)}`
  );
  verifyAsJSON(__dirname, "Combination.Test", testResults);
});

function updateTest(name, sellIn, quality) {
  const gildedRose = new Shop([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  return items[0].toString();
}

function cartesian(...args) {
  var r = [],
    max = args.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = args[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}
