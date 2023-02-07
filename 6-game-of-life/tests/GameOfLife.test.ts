/* eslint-disable jest/no-commented-out-tests */
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

describe("Pulsar Tests", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
    const pattern = `#N Pulsar
#O John Conway
#C A period 3 oscillator. Despite its size, this is the fourth most common oscillator (and by
#C far the most common of period greater than 2).
#C www.conwaylife.com/wiki/index.php?title=Pulsar
x = 13, y = 13, rule = B3/S23
2b3o3b3o2b2$o4bobo4bo$o4bobo4bo$o4bobo4bo$2b3o3b3o2b2$2b3o3b3o2b$o4bob
o4bo$o4bobo4bo$o4bobo4bo2$2b3o3b3o!`;
    game.fromRLE(pattern);
  });

  it("Pulsar initial", () => {
    expect(game.getWorld().getNumOfAliveCell()).toBe(48);
  });

  it("Pulsar evolve 1 time, the number of alive cell should be 56", () => {
    // FIX the evolve function got problem
    game.iterEvolve(1);
    expect(game.getWorld().getNumOfAliveCell()).toBe(56);
  });

  it("Pulsar evlove 1 times, the string pattern", () => {
    game.iterEvolve(1);

    expect(game.toRLE()).toBe(`x = 15, y = 15
4bo5bo$4bo5bo$4b2o3b2o2$3o2b2ob2o2b3o$2bobobobobobo$4b2o3b2o2$4b2o3b2o
$2bobobobobobo$3o2b2ob2o2b3o2$4b2o3b2o$4bo5bo$4bo5bo!`);
  });

  it("Pulsar evlove 2 times, the alive cell should match 18x4", () => {
    game.iterEvolve(2);
    expect(game.getWorld().getNumOfAliveCell()).toBe(18 * 4);
  });

  it.skip("Pulsar evlove 2 times, rle should match given string", () => {
    game.iterEvolve(2);
    expect(game.toRLE()).toBe(`x = 13, y = 13
2b2o5b2o$3b2o3b2o$o2bobobobo2bo$3ob2ob2ob3o$bobobobobobo$2b3o3b3o2$2b
3o3b3o$bobobobobobo$3ob2ob2ob3o$o2bobobobo2bo$3b2o3b2o$2b2o5b2o!`);
  });
});

describe("Blinder Tests", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();

    const blinker = `#N Blinker
    #O John Conway
    #C A period 2 oscillator that is the smallest and most common oscillator.
    #C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 1, rule = B3/S23
3o!`;

    game.fromRLE(blinker);
  });
  it("should without any problem iter 11 generations", () => {
    game.iterEvolve(11);
    expect(game.toRLE()).toBe(`x = 1, y = 3
o$o$o!`);
  });
});

describe("Random Pick Some Complexed Pattern", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
  });

  it("cisbeaconontable should only have two states, no matter how many iter", () => {
    const pattern = `#N cisbeaconontable.rle
    #C https://conwaylife.com/wiki/Cis-beacon_on_table
    #C https://www.conwaylife.com/patterns/cisbeaconontable.rle
    x = 4, y = 7, rule = B3/S23
2b2o$3bo$o$2o2$4o$o2bo!`;
    game.fromRLE(pattern);
    game.iterEvolve(1);
    expect(game.getWorld().getNumOfAliveCell()).toBe(14);

    expect(game.toRLE()).toBe(`x = 4, y = 7
2b2o$2b2o$2o$2o2$4o$o2bo!`);

    game.iterEvolve(100);
    expect(game.toRLE()).toBe(`x = 4, y = 7
2b2o$2b2o$2o$2o2$4o$o2bo!`);

    game.iterEvolve(101);
    expect(game.toRLE()).toBe(`x = 4, y = 7
2b2o$3bo$o$2o2$4o$o2bo!`);
  });
});

describe("Test gilder train", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
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
  17b6o6b2o$31b2o$32b2o!`;

    game.fromRLE(pattern);
  });
  it("glidertrain iter 1 gen, test number of alive cells", () => {
    expect(game.getWorld().getNumOfAliveCell()).toBe(248);
    game.iterEvolve(1);
    expect(game.getWorld().getNumOfAliveCell()).toBe(278);
  });

  it("gilder train iter 123 gen, test alive cells", () => {
    game.iterEvolve(123);
    expect(game.getWorld().getNumOfAliveCell()).toBe(322);
  });

  // TODO this one they got 69,70,71, with line number!!!
  it.skip("gilder train iter 123 gen, test rle string", () => {
    game.iterEvolve(123);
    expect(game.toRLE()).toBe(`x = 129, y = 95
2o$obo$o6$24b2o$24bobo$24bo6$48b2o$48bobo$48bo6$72b2o$72bobo$72bo6$96b
2o$96bobo16b2o$96bo14b4ob2o5b4o$37b2obo70b6o5b6o$89b2o21b4o6b4ob2o$86b
3ob2o34b2o$38bob2o44b5o$38b2o47b3o$81b2o33bo$80bo2bo32b2o5b3o$83bo15b
o14bo2bo3b2o$64b2o12b2o5b2o11b2o12b3o6bo4b2o$19b2o30b2o10bo2bo8b3o7b2o
4b2o4b3o7b2o4b2o5b2ob2o2bo$19b2o30b2o11b2o9b2o2bobo9b2o14b2o5bobo10bo
$80bo35bo7b3o2$80bo35bo7b3o$19b2o30b2o11b2o9b2o2bobo9b2o14b2o5bobo10b
o$19b2o30b2o10bo2bo8b3o7b2o4b2o4b3o7b2o4b2o5b2ob2o2bo$64b2o12b2o5b2o11b
2o12b3o6bo4b2o$83bo15bo14bo2bo3b2o$80bo2bo32b2o5b3o$81b2o33bo$38b2o47b
3o$38bob2o44b5o$86b3ob2o34b2o$89b2o21b4o6b4ob2o$37b2obo70b6o5b6o$96bo
14b4ob2o5b4o$96bobo16b2o$96b2o6$72bo$72bobo$72b2o6$48bo$48bobo$48b2o6$
24bo$24bobo$24b2o6$o$obo$2o!`);
  });
});

// 2o$obo$o6$24b2o$24bobo$24bo6$48b2o$48bobo$48bo6$72b2o$72bobo$72bo6$96b
// 2o$obo$o6$24b2o$24bobo$24bo6$48b2o$48bobo$48bo6$72b2o$72bobo$72bo6$96b2o
