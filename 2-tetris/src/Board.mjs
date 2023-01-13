export class Board {
  EMPTY = ".";

  width;

  height;

  falling;

  fallingBlockRow = 0;

  stationary;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.fallingBlockCol = Math.round(width / 2) - 1;
    this.initStationary(height, width);
  }

  initStationary(height, width) {
    this.stationary = Array(height)
      .fill(this.EMPTY)
      .map(() => Array(width).fill(this.EMPTY));
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.falling = block;
    this.fallingBlockRow = 0;
    this.fallingBlockCol = 1;
  }

  tick() {
    if (this.fallingBlockRow === this.height - 1) {
      this.stationary[this.fallingBlockRow][this.fallingBlockCol] =
        this.falling.getColor();
      this.falling = undefined;
    } else if (
      this.stationary[this.fallingBlockRow + 1][this.fallingBlockCol] ===
      this.EMPTY
    ) {
      this.fallingBlockRow += 1;
    } else {
      this.stationary[this.fallingBlockRow][this.fallingBlockCol] =
        this.falling.getColor();
      this.falling = undefined;
    }
  }

  hasFalling() {
    return this.falling !== undefined;
  }

  toString() {
    let blockString = "";
    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        blockString += this.getColorAt(row, col);
      }
      blockString += "\n";
    }
    return blockString;
  }

  hasFallingAt(row, col) {
    return (
      row === this.fallingBlockRow &&
      col === this.fallingBlockCol &&
      this.hasFalling()
    );
  }

  getColorAt(row, col) {
    return this.hasFallingAt(row, col)
      ? this.falling.getColor()
      : this.stationary[row][col];
  }
}
