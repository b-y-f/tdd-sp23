import { World, Cell } from "../src/World";

describe("Test world, cell and neighbor cells", () => {
  let world;
  beforeEach(() => {
    world = new World(10, 10);
  });
  it("test alive cell number", () => {
    expect(world.getNumOfAliveCell()).toBe(0);
  });

  it("add cell to the map(world)", () => {
    world.addCell(3, 3, true);
    expect(world.getNumOfAliveCell()).toBe(1);
  });

  it("test rules alive neighbors number", () => {
    const cell: Cell = {
      x: 2,
      y: 2,
      isAlive: true,
    };
    const aliveNeighbors = world.getAliveNeighbors(cell);
    expect(aliveNeighbors).toBe(0);
  });
});
