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
      row: 2,
      col: 2,
      isAlive: true,
    };
    const aliveNeighbors = world.getAliveNeighbors(cell);
    expect(aliveNeighbors).toBe(0);
  });

  it("more(3) neighbors test", () => {
    const cell0: Cell = {
      row: 3,
      col: 3,
      isAlive: true,
    };

    world.addCell(3, 3, true);
    world.addCell(4, 3, true);
    world.addCell(2, 2, true);
    world.addCell(4, 4, true);
    const aliveNeighbors = world.getAliveNeighbors(cell0);
    expect(aliveNeighbors).toBe(3);
  });
});
