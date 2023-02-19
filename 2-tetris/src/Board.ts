import { Block } from "./Block";

type Cell = string | undefined;

export class Board {
  private readonly width: number;
  private readonly height: number;
  private readonly board: Cell[][];

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
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ".")
    );
  }

  public hasFalling(): boolean {
    return this.currentBlock !== undefined;
  }

  public tick(): void {
    if (this.hasFalling()) {
      if (this.isCollision()) {
        if (this.currentBlock) {
          this.fixed.push(this.currentBlock);
          this.currentBlock = undefined;
        }
      } else {
        this.currentBlock?.moveDown();
        this.updateBoard();
      }
    }
  }

  private isCollision(): boolean {
    const isBottom: boolean = this.currentBlock?.getY() === this.height - 1;
    const isTouchOthers: boolean = this.fixed.some(
      (fixedBlk) =>
        this.currentBlock && fixedBlk.getY() === this.currentBlock?.getY() + 1
    );
    return isBottom || isTouchOthers;
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

        this.renderFixedBlock(row, col);
      }
    }
  }

  private renderFixedBlock(row: number, col: number): void {
    const foundBlock = this.fixed.find(
      (blk) => blk.getY() === row && blk.getX() === col
    );
    if (foundBlock) {
      this.board[foundBlock.getY()][foundBlock.getX()] = foundBlock.getColor();
    }
  }

  public toString(): string {
    return this.board.map((row) => row.join("")).join("\n") + "\n";
  }
}
