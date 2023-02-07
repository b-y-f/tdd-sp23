import { GameOfLife } from "../src/GameOfLife";

describe("Blom, the cell will grow when more iter", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
    const pattern = `x = 12, y = 5, rule = B3/S23
o10bo$b4o6bo$2b2o7bo$10bo$8bobo!`;
    game.fromRLE(pattern);
  });
  it("test number of alive cells after iter:176", () => {
    expect(game.getWorld().getNumOfAliveCell()).toBe(13);
    game.iterEvolve(176);
    expect(game.getWorld().getNumOfAliveCell()).toBe(97);
  });

  it("T=352, alive cell=113", () => {
    game.iterEvolve(352);
    expect(game.getWorld().getNumOfAliveCell()).toBe(113);
  });

  it("T=515, alive cell=324", () => {
    game.iterEvolve(515);
    expect(game.getWorld().getNumOfAliveCell()).toBe(324);
  });

  it("T=352, should match string as well", () => {
    game.iterEvolve(352);
    expect(game.toRLE()).toBe(`x = 77, y = 113
3bo$2b2o$2bobo44$40bo$39bob2o$39bo$39bo2bo$40b2o$24b2o$24b2o$74b2o$74b
obo$75b2o4$56b2o$56b2o$30b2o$29bo2bo8b2o$30bobo8b2o21b2o$16b2o13bo32b2
o$16b2o5$2o16b2o$obo15b2o$o8b3o28b2o$11bo10b3o15b2o$7b3ob2o8bo3bo$6bo2
bo11bo3bo$5bo2b2o11bo$10bobo12bo$15b2o5bo$7bo5b4o6bobo$7b2o3bo11bo2$20
b3o3b3o2$24bo$24bo$24bo24$27bo$27bobo$27b2o!`);
  });
});
