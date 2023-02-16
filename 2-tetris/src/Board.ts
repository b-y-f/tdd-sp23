import { Block } from "./Block";

export class Board {
  private width: number;
  private height: number;
  private board: number[][];
  private currentBlock: Block | undefined;
  constructor(width: number, height: number) {
    this.currentBlock = undefined;
    this.width = width;
    this.height = height;
    this.board = this.createBoard(height, width);
  }

  private createBoard(height: number, width: number): number[][] {
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
    return this.currentBlock === undefined;
  }
  public tick(): void {
    throw new Error("Method not implemented.");
  }
  public drop(blk: Block): void {
    this.currentBlock = blk;
    this.board[blk.getY()][blk.getX()] = 1;
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
