export interface Cell {
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

  public evolve(): void {
    const nextGen: Cell[] = [];
    for (const cell of this.cells) {
      const aliveNeighbors = this.getAliveNeighbors(cell);
      if (cell.isAlive) {
        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
          nextGen.push({ ...cell, isAlive: true });
        }
      }
    }
  }

  public addCell(row: number, col: number, isAlive: boolean) {
    this.cells.push({ row: row, col: col, isAlive });
  }

  public getNumOfAliveCell(): number {
    return this.cells.length;
  }

  public getCell(row: number, col: number): Cell {
    return this.cells.find((c) => c.row === row && c.col === col);
  }

  public getAliveNeighbors(cell: Cell): number {
    let cnt = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (row == 0 && col == 0) {
          continue;
        }
        const { neighborCol, neighborRow } = this.getNeighborPos(
          cell,
          col,
          row
        );
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
    const neighborCol = cell.col + col;
    const neighborRow = cell.row + row;
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
