import { Block } from "./Block";

export class Board {
  private width: number;
  private height: number;
  private board: (string | undefined)[][];
  private currentBlock: Block | undefined;
  private fixed: Block[];
  constructor(width: number, height: number) {
    this.currentBlock = undefined;
    this.fixed = [];
    this.width = width;
    this.height = height;
    this.board = this.createBoard(height, width);
  }

  private createBoard(height: number, width: number): string[][] {
    const board: string[][] = [];
    for (let i = 0; i < height; i++) {
      board[i] = [];
      for (let j = 0; j < width; j++) {
        board[i][j] = ".";
      }
    }
    return board;
  }

  public hasFalling(): boolean {
    return this.currentBlock !== undefined;
  }

  public tick(): void {
    if (this.currentBlock?.getY() === this.height - 1) {
      this.fixed.push(this.currentBlock);
      this.currentBlock = undefined;
    } else {
      this.currentBlock?.moveDown();
      this.updateBoard();
    }
  }

  public drop(blk: Block): void {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }

    this.currentBlock = blk;
    this.updateBoard();
  }

  private updateBoard(): void {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (
          row === this.currentBlock?.getY() &&
          col === this.currentBlock?.getX()
        ) {
          this.board[row][col] = this.currentBlock?.getColor();
        } else {
          this.board[row][col] = ".";
        }

        const foundBlock = this.fixed.find(
          (blk) => blk.getY() === row && blk.getX() === col
        );
        if (foundBlock) {
          this.board[foundBlock.getY()][foundBlock.getX()] =
            foundBlock.getColor();
        }
      }
    }
  }

  public toString(): string {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += this.board[row][col];
      }
      s += "\n";
    }
    return s;
  }
}
