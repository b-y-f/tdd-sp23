import { Block } from "./Block";

export class Board {
  private width: number;
  private height: number;
  private board: number[][];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(height, width);
  }

  private createBoard(height: number, width: number) {
    const board: number[][] = [];
    for (let i = 0; i < height; i++) {
      board[i] = [];
      for (let j = 0; j < width; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }

  public hasFalling(): boolean {
    throw new Error("Method not implemented.");
  }
  public tick() {
    throw new Error("Method not implemented.");
  }
  public drop(blk: Block): void {
    const color = blk.getColor();
    this.board[0][1] = color ? 1 : 0;
  }

  public toString(): string {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.board[row][col] === 0) {
          s += ".";
        } else {
          s += "X";
        }
      }
      s += "\n";
    }
    return s;
  }
}
