export interface Cell {
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

  public getAliveNeighbors(cell: Cell): number {
    let cnt = 0;
    for (let row = -1; row < 1; row++) {
      for (let col = -1; col < 1; col++) {
        if (row == 0 && col == 0) {
          continue;
        }
        const neighborX = cell.x + col;
        const neighborY = cell.y + row;
        if (
          neighborX >= 0 &&
          neighborX < this.height &&
          neighborY >= 0 &&
          neighborY < this.width
        ) {
          const neighbor = this.cells.find(
            (c) => c.x === neighborX && c.y === neighborY
          );
          if (neighbor && neighbor.isAlive) {
            cnt++;
          }
        }
      }
    }
    return cnt;
  }
}
