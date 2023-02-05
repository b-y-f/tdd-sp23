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

  it("more(8) neighbors test", () => {
    const cell: Cell = {
      row: 4,
      col: 4,
      isAlive: true,
    };
    world.addCell(3, 3, true);
    world.addCell(5, 5, true);
    world.addCell(5, 4, true);
    world.addCell(4, 5, true);
    world.addCell(3, 5, true);
    world.addCell(5, 3, true);
    world.addCell(3, 4, true);
    world.addCell(4, 3, true);
    const aliveNeighbors = world.getAliveNeighbors(cell);
    expect(aliveNeighbors).toBe(8);
  });
});

describe("Evolve tests", () => {
  let world;
  beforeEach(() => {
    world = new World(10, 10);
  });
  it("any live cell with two or three live neighbor survives", () => {
    world.addCell(4, 4, true);
    world.addCell(3, 3, true);
    world.addCell(5, 5, true);
    world.evolve();
    const state = world.getCell(4, 4).isAlive;
    expect(state).toBe(true);
  });

  it("any dead cell with three live neighbor become alive cell", () => {
    world.addCell(4, 4, false);
    world.addCell(3, 3, true);
    world.addCell(5, 5, true);
    world.addCell(3, 4, true);
    world.evolve();
    const state = world.getCell(4, 4).isAlive;
    expect(state).toBe(true);
  });

  it("any other die in next generation, dead stay dead", () => {
    world.addCell(4, 4, false);
    world.evolve();
    const state = world.getCell(4, 4).isAlive;
    expect(state).toBe(false);
  });
});
