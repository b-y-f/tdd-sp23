export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(width, height);
    this.falling = undefined; // {posX, posY, blk}
    this.middle = Math.floor(width / 2);
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
    if (this.falling !== undefined) {
      throw new Error("already falling");
    }

    if (block.width === 1) {
      this.board[0][this.middle] = block.shapeArray;
      this.falling = { pos_i: 0, pos_j: 1, blk: block };
    }

    if (block.shapeType === "T") {
      const startPos = { r: 0, c: 3 };
      for (let i = 0; i < block.height; i++) {
        for (let j = startPos.c; j < block.width + startPos.c; j++) {
          this.board[i][j] = block.shapeArray[i][j - startPos.c];
        }
      }
      this.falling = { pos_i: 1, pos_j: 3, blk: block };
    }
  }

  tick() {
    if (this.falling !== undefined) {
      const { pos_i, pos_j, blk } = this.falling;

      if (blk.shapeType === "T") {
        if (
          pos_i === this.height - 1 ||
          this.board[pos_i + 1][pos_j + 1] !== "."
        ) {
          this.falling = undefined;
          return;
        }
        for (let j = 3; j < blk.width + 3; j++) {
          //move botom
          this.board[pos_i + 1][j] = this.board[pos_i][j];
          //move top
          this.board[pos_i][j] = this.board[pos_i - 1][j];
          this.board[pos_i - 1][j] = ".";
        }
      }

      if (blk.width === 1) {
        if (pos_i === this.height - 1 || this.board[pos_i + 1][pos_j] !== ".") {
          this.falling = undefined;
          return;
        }
        this.board[pos_i][pos_j] = ".";
        this.board[pos_i + 1][pos_j] = blk.shapeArray;
      }
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
