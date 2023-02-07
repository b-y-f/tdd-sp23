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
});
