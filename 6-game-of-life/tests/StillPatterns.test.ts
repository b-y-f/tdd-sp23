import { GameOfLife } from "../src/GameOfLife";

describe("Name of the group", () => {
  let game;
  beforeEach(() => {
    game = new GameOfLife();
  });
  it("15-bent-paperclip, should still no matter how many iter", () => {
    const pattern = `x = 7, y = 5, rule = B3/S23
        2b2o$bob3o$o5bo$b4obo$3bobo!`;
    game.fromRLE(pattern);
    game.iterEvolve(3211);
    expect(game.getWorld().getNumOfAliveCell()).toBe(15);

    expect(game.toRLE()).toBe(`x = 7, y = 5
2b2o$bob3o$o5bo$b4obo$3bobo!`);
  });
});
