export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(width, height);
    this.falling = undefined; // {posX, posY, blk}
  }

  createBoard() {
    return new Array(this.height)
      .fill(".")
      .map(() => new Array(this.width).fill("."));
  }

  hasFalling() {
    return this.falling !== undefined;
  }

  drop(block) {
    if (this.falling === undefined) {
      let color = block.getColor();
      this.board[0][1] = color;
      this.falling = { pos_i: 0, pos_j: 1, blk: block };
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.falling !== undefined) {
      const { pos_i, pos_j, blk } = this.falling;
      if (pos_i === this.height - 1 || this.board[pos_i + 1][pos_j] !== ".") {
        this.falling = undefined;
        return;
      }
      this.board[pos_i][pos_j] = ".";
      this.board[pos_i + 1][pos_j] = blk.getColor();
      this.falling = { pos_i: pos_i + 1, pos_j: pos_j, blk: blk };
    }
  }

  toString() {
    let res = "";
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let j = 0; j < row.length; j++) {
        const tile = this.board[i][j];
        res = res.concat(tile);
      }
      res = res.concat("\n");
    }
    return res;
  }
}
