export class Board {
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    const board: number[][] = [];

    for (let i = 0; i < height; i++) {
      board[i] = [];
      for (let j = 0; j < width; j++) {
        board[i][j] = 0;
      }
    }
  }

  public toString(): string {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += ".";
      }
      s += "\n";
    }
    return s;
  }
}
