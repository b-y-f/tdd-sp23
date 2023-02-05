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
});
