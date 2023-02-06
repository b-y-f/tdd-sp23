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

  it("15 cell raw diagonal", () => {
    const patString = `x = 14, y = 13, rule = B3/S23
12b2o$11bobo$10bo$9bo$8bo$7bo$6bo$5bo$4bo$3bo$2bo$bo$o!`;
    game.fromRLE(patString);
    expect(game.getWorld().getNumOfAliveCell()).toBe(15);
  });

  it("Cis-bi-boat , 10 cells", () => {
    const patString = `#N cisbiboat.rle
#C https://conwaylife.com/wiki/Cis-bi-boat
#C https://www.conwaylife.com/patterns/cisbiboat.rle
x = 7, y = 3, rule = B3/S23
bo3bo$obobobo$b2ob2o!`;
    game.fromRLE(patString);
    expect(game.getWorld().getNumOfAliveCell()).toBe(10);
  });
});

describe("Test after evolve some evolve", () => {
  let game;

  beforeEach(() => {
    game = new GameOfLife();
    const patString = `#N Glider
#O Richard K. Guy
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Glider
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`;
    game.fromRLE(patString);
  });
  it("Gilder should be able to keep same shape after 1 evolve", () => {
    game.iterEvolve(1);
    expect(game.getWorld().getNumOfAliveCell()).toBe(5);
  });

  it("Gilder should able to keep same shape after 3 evolves", () => {
    game.iterEvolve(3);
    expect(game.getWorld().getNumOfAliveCell()).toBe(5);
  });

  it("Gilder should able to keep same shape after 10 evolves", () => {
    game.iterEvolve(10);
    expect(game.getWorld().getNumOfAliveCell()).toBe(5);
  });

  it("Gilder should able to keep same shape after 1000 evolves", () => {
    game.iterEvolve(1000);
    expect(game.getWorld().getNumOfAliveCell()).toBe(5);
  });
});
