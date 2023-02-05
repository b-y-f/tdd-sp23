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

  public getCell(row: number, col: number): Cell {
    return this.cells[row][col];
  }

  private deepCopy(arr: any[][]): any[][] {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
      newArray[i] = [];
      for (let j = 0; j < arr[i].length; j++) {
        newArray[i][j] = arr[i][j];
      }
    }
    return newArray;
  }

  /**
   * When come with "b" and "o" from RLE: b=DEAD, o=ALIVE
   */
  public evolve(): void {
    const nextGen = this.deepCopy(this.cells);
    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[0].length; col++) {
        const aliveNeighbors = this.getAliveNeighbors(row, col);

        if (this.cells[row][col].isAlive) {
          if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            nextGen[row][col].isAlive = true;
          }
        } else {
          if (aliveNeighbors === 3) {
            nextGen[row][col].isAlive = true;
          }
        }
      }
    }
    this.cells = nextGen;
  }

  public addCell(row: number, col: number): void {
    this.cells[row][col].isAlive = true;
  }

  public getNumOfAliveCell(): number {
    let liveNeighbors = 0;
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.cells[row][col].isAlive) {
          liveNeighbors++;
        }
      }
    }
    return liveNeighbors;
  }

  public getAliveNeighbors(row: number, col: number): number {
    let cnt = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) {
          continue;
        }
        const r = row + i;
        const c = col + j;

        if (r >= 0 && r < this.height && c >= 0 && c < this.width) {
          if (this.cells[r][c].isAlive) {
            cnt++;
          }
        }
      }
    }
    return cnt;
  }
}
