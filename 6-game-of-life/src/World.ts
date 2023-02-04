interface Cell {
  x: number;
  y: number;
  isAlive: boolean;
}

export class World {
  private cells: Cell[];
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = [];
  }

  public addCell(x: number, y: number, isAlive: boolean) {
    this.cells.push({ x, y, isAlive });
  }

  public getNumOfAliveCell(): number {
    return this.cells.length;
  }
}
