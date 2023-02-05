export interface Cell {
  y: number;
  x: number;
  isAlive: boolean;
}

/**
 * this world will accept width and height to initial,
 * then 2d cell will initially be all dead cells
 */
export class World {
  private cells: Cell[][];
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = [];
    for (let row = 0; row < height; row++) {
      this.cells[row] = [];
      for (let col = 0; col < width; col++) {
        const initCell: Cell = {
          x: col,
          y: row,
          isAlive: false,
        };
        this.cells[row][col] = initCell;
      }
    }
  }

  public evolve(): void {
    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[0].length; col++) {
        const aliveNeighbors = this.getAliveNeighbors();
      }
    }
  }

  public addCell(row: number, col: number, isAlive: boolean) {
    this.cells[row][col].isAlive = isAlive;
  }

  public getNumOfAliveCell(): number {
    return this.cells.length;
  }

  public getAliveNeighbors(row: number, col: number): number {
    let cnt = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (row == 0 && col == 0) {
          continue;
        }
        const { neighborCol, neighborRow } = this.getNeighborPos(col, row);
        if (this.neighborInWorld(neighborCol)) {
          const neighbor = this.getCell(neighborCol, neighborRow);
          if (neighbor && neighbor.isAlive) {
            cnt++;
          }
        }
      }
    }
    return cnt;
  }

  private getNeighborPos(cell: Cell, col: number, row: number) {
    const neighborCol = cell.x + col;
    const neighborRow = cell.y + row;
    return { neighborCol, neighborRow };
  }

  private neighborInWorld(neighborCol: number) {
    return (
      neighborCol >= 0 &&
      neighborCol < this.height &&
      neighborCol >= 0 &&
      neighborCol < this.width
    );
  }
}
