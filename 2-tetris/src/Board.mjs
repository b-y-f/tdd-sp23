export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(width, height);
    this.falling = undefined;
    this.inBottom = undefined;
  }

  createBoard() {
    return new Array(this.height)
      .fill(".")
      .map(() => new Array(this.width).fill("."));
  }

  drop(block) {
    let color = block.getColor();
    this.board[0][1] = color;
  }

  tick() {
    let orginPos = [];

    for (let i = 0; i < this.board.length - 1; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] !== ".") {
          orginPos.push({ i: i + 1, j: j, color: this.board[i][j] });
          this.board[i][j] = ".";
        }
      }
    }

    // move down
    for (const pos of orginPos) {
      let i, j, color;
      ({ i, j, color } = pos);
      this.board[i][j] = color;
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
