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

describe("It should be able to correctly output world of cells to RLE string", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
  });

  it("Test block pattern", () => {
    const blockString = `#N Block
#C An extremely common 4-cell still life.
#C www.conwaylife.com/wiki/index.php?title=Block
x = 2, y = 2, rule = B3/S23
2o$2o!`;

    game.fromRLE(blockString);
    game.iterEvolve(10);
    const rle = game.toRLE();
    expect(rle).toEqual(`x = 2, y = 2
2o$2o!`);
  });

  it("Test gilder after 10 evolve", () => {
    const gilder = `#N Glider
#O Richard K. Guy
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Glider
x = 3, y = 3, rule = B3/S23
bob$2bo$3o!`;

    game.fromRLE(gilder);
    game.iterEvolve(10);
    const rle = game.toRLE();
    expect(rle).toEqual(`x = 3, y = 3
2bo$obo$b2o!`);
  });
});

describe("Random Pick Some Complexed Pattern", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
  });

  it.skip("glidertrain", () => {
    const pattern = `#N glidertrain.rle
#O Bill Gosper
#C https://conwaylife.com/wiki/Glider_train
#C https://www.conwaylife.com/patterns/glidertrain.rle
x = 68, y = 33, rule = B3/S23
32b2o$31b2o$33bo17b6o6b2o$50bo5bo4bo4bo$56bo10bo$26b5o19bo4bo5bo5bo$
25bo4bo21b2o8b6o$30bo$18b2o5bo3bo23bo$18b2o7bo24bobo$14b3o4bo29bo5bo$
13bob2o5b2o11b2o15bobobobo6bo$b2o9b2obobo3b2o11bo2bo13b2o2bo3bo5b2o$o
2bo9b6o9b2o4bobo7b2o5b2o3b2obo4bob2o$b2o11b4o10b2o5bo8b2o7bo5bo4bobo$
50bobo11b2o2$50bobo11b2o$b2o11b4o10b2o5bo8b2o7bo5bo4bobo$o2bo9b6o9b2o
4bobo7b2o5b2o3b2obo4bob2o$b2o9b2obobo3b2o11bo2bo13b2o2bo3bo5b2o$13bob
2o5b2o11b2o15bobobobo6bo$14b3o4bo29bo5bo$18b2o7bo24bobo$18b2o5bo3bo23b
o$30bo$25bo4bo21b2o8b6o$26b5o19bo4bo5bo5bo$56bo10bo$50bo5bo4bo4bo$33bo
17b6o6b2o$31b2o$32b2o!
`;
    game.fromRLE(pattern);

    expect(game.getWorld().getNumOfAliveCell()).toBe(37);
  });

  it("Pulsar", () => {
    const pattern = `#N Pulsar
#O John Conway
#C A period 3 oscillator. Despite its size, this is the fourth most common oscillator (and by
#C far the most common of period greater than 2).
#C www.conwaylife.com/wiki/index.php?title=Pulsar
x = 13, y = 13, rule = B3/S23
2b3o3b3o2b2$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b2$2b3o3b3o2b$o4bob
o4bo$o4bobo4bo$o4bobo4bo2$2b3o3b3o!`;
    game.fromRLE(pattern);

    expect(game.getWorld().getNumOfAliveCell()).toBe(48);
  });
});
