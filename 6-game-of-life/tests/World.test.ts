import { World } from "../src/World";

describe("Test world, cell and neighbor cells", () => {
  it("World can be add a cell", () => {
    const world = new World(10, 10);
    expect(world.getNumberOfCell()).toBe(100);
  });
});
