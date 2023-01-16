import { expect } from "chai";
import { Shop } from "../src/gilded_rose.mjs";
import { Item } from "../src/item.mjs";
import { verify } from "approvals";
import { fileURLToPath } from "url";
import { dirname, join as pathJoin } from "path";
import { readFileSync } from "fs";

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
 *
 * Added approval test in middle, find this way much faster to iterate all
 * the scenarios and easier to pass mutation test.
 * It uses something similiar to `diff` command to compare to files.
 * If after mutation, the "receive" is different with "approved" its ok,
 * if still same, we got problem and that need to be catched with test.
 * But I found approval test and mutation test package not compatible very
 * well. Always got some "runtimeError".
 *
 */

describe("Gilded Rose", () => {
  it("Hello world test!", () => {
    expect(updateTest("foo", 10, 0)).to.equal("foo | 9 | 0");
  });

  it("Test for empty items", () => {
    const empty = new Shop();
    const items = empty.updateQuality();
    expect(items.toString()).to.be.empty;
  });
});

const names = ["foo", "Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"];
const sellIns = [0, 1, -1, 11, 6];
const qualities = [0, 50, 49];
const paraCombs = cartesian(names, sellIns, qualities);

// describe("Approval Tests", () => {
//   const testResults = paraCombs
//     .map(([name, sellIn, quality]) => `${name} | ${sellIn} | ${quality} => ${updateTest(name, sellIn, quality)}\n`)
//     .join("");
//   verify(__dirname, "Combination.Test", testResults);
// });

describe("Batch Test without approval, I'm lazy...", () => {
  const { answers, questions } = loadTestFromFile();

  for (let i = 0; i < answers.length - 1; i++) {
    const { name, sellIn, quality } = parseToGetParameter(questions[i]);
    it(`Input name:${name}, sellIn: ${sellIn}, quality: ${quality}`, () => {
      expect(updateTest(name, sellIn, quality).replace(/\s/g, "")).to.equal(answers[i].replace(/\s/g, ""));
    });
  }
});

function loadTestFromFile() {
  const lastTest = readFileSync(pathJoin(__dirname, "Combination.Test.approved.txt"));
  const testCases = lastTest.toString().split("\n");
  const answers = [];
  const questions = [];
  for (const s of testCases) {
    const [input, output] = s.split(" => ");
    questions.push(input);
    answers.push(output);
  }
  return { answers, questions };
}

function parseToGetParameter(questionString) {
  let [name, sellIn, quality] = questionString.split("|");
  name = name.trim();
  sellIn = parseInt(sellIn);
  quality = parseInt(quality);
  return { name, sellIn, quality };
}

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
