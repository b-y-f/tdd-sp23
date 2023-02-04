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
    const cell1: Cell = {
      row: 4,
      col: 3,
      isAlive: true,
    };
    const cell2: Cell = {
      col: 2,
      row: 2,
      isAlive: true,
    };
    const cell3: Cell = {
      col: 4,
      row: 4,
      isAlive: true,
    };
    world.addCell(cell0);
    world.addCell(cell1);
    world.addCell(cell2);
    world.addCell(cell3);
    const aliveNeighbors = world.getAliveNeighbors(cell0);
    expect(aliveNeighbors).toBe(3);
  });
});
