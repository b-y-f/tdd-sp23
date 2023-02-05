/* eslint-disable jest/no-disabled-tests */
/**
 * this test will test UI of this game, this UI will be
 * able to read RLE file and write to RLE file(decode and encode)
 * and be able to iterate the game
 */

import { GameOfLife } from "../src/GameOfLife";

describe("read the RLE files", () => {
  let game;

  beforeEach(() => {
    game = new GameOfLife();
  });

  it("should be able to decode RLE file", () => {
    const blockString = `#N Block
#C An extremely common 4-cell still life.
#C www.conwaylife.com/wiki/index.php?title=Block
x = 2, y = 2, rule = B3/S23
2o$2o!`;

    game.fromRLE(blockString);
    expect(game.getWorld().getNumOfAliveCell()).toBe(4);
  });

  it("bit complex pattern, Glider", () => {
    const patString = `#N Glider
#O Richard K. Guy
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Glider
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`;
    game.fromRLE(patString);
    expect(game.getWorld().getNumOfAliveCell()).toBe(5);
  });
});
