import { GameOfLife } from "../src/GameOfLife";

describe("Blom, the cell will grow when more iter", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
  });
  it("test number of alive cells after iter", () => {
    const pattern = `x = 12, y = 5, rule = B3/S23
o10bo$b4o6bo$2b2o7bo$10bo$8bobo!`;
    game.fromRLE(pattern);
    expect(game.getWorld().getNumOfAliveCell()).toBe(13);

    game.iterEvolve(176);
    expect(game.getWorld().getNumOfAliveCell()).toBe(97);

    game.iterEvolve(596);
    expect(game.getWorld().getNumOfAliveCell()).toBe(412);
  });
});
