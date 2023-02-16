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
    return this.currentBlock !== undefined;
  }
  public tick(): void {
    if (this.hasFalling()) {
      this.currentBlock?.moveDown();
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          if (
            row === this.currentBlock?.getY() &&
            col === this.currentBlock?.getX()
          ) {
            this.board[row][col] = 1;
          } else {
            this.board[row][col] = 0;
          }
        }
      }
    }
  }
  public drop(blk: Block): void {
    this.currentBlock = blk;
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (
          row === this.currentBlock.getY() &&
          col === this.currentBlock.getX()
        ) {
          this.board[row][col] = 1;
        } else {
          this.board[row][col] = 0;
        }
      }
    }
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
