interface Cell {
  row: number;
  col: number;
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

  public getNumberOfCell(): number {
    return this.width * this.height;
  }
}
