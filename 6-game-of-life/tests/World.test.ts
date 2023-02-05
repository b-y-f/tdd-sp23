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
    world.addCell(3, 3);
    expect(world.getNumOfAliveCell()).toBe(1);
  });

  it("test rules alive neighbors number", () => {
    const aliveNeighbors = world.getAliveNeighbors(2, 2);
    expect(aliveNeighbors).toBe(0);
  });

  it("more(3) neighbors test", () => {
    world.addCell(3, 3);
    world.addCell(4, 3);
    world.addCell(2, 2);
    world.addCell(4, 4);
    const aliveNeighbors = world.getAliveNeighbors(3, 3);
    expect(aliveNeighbors).toBe(3);
  });

  it("more(8) neighbors test", () => {
    world.addCell(3, 3);
    world.addCell(5, 5);
    world.addCell(5, 4);
    world.addCell(4, 5);
    world.addCell(3, 5);
    world.addCell(5, 3);
    world.addCell(3, 4);
    world.addCell(4, 3);
    const aliveNeighbors = world.getAliveNeighbors(4, 4);
    expect(aliveNeighbors).toBe(8);
  });
});

describe("Evolve tests", () => {
  let world;
  beforeEach(() => {
    world = new World(10, 10);
  });
  it("any live cell with two or three live neighbor survives", () => {
    world.addCell(4, 4);
    world.addCell(3, 3);
    world.addCell(5, 5);
    world.evolve();
    const state = world.getCell(4, 4).isAlive;
    expect(state).toBe(true);
  });

  it("any dead cell with three live neighbor become alive cell", () => {
    world.addCell(3, 3);
    world.addCell(5, 5);
    world.addCell(3, 4);
    world.evolve();
    const state = world.getCell(4, 4).isAlive;
    expect(state).toBe(true);
  });

  it("any other die in next generation, dead stay dead", () => {
    world.evolve();
    const state = world.getCell(4, 4).isAlive;
    expect(state).toBe(false);
  });
});
