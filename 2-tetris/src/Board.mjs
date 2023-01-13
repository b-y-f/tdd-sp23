export class Board {
  EMPTY = ".";

  width;

  height;

  falling = undefined;

  fallingBlockRow = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    this.falling = block;
  }

  tick() {
    this.fallingBlockRow += 1;
  }

  hasFalling() {
    return this.falling !== undefined;
  }

  toString() {
    let blockString = "";
    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        blockString += this.hasFallingAt(row, col)
          ? this.falling.getColor()
          : this.EMPTY;
      }
      blockString += "\n";
    }
    return blockString;
  }

  hasFallingAt(row, col) {
    return row === this.fallingBlockRow && col === 1 && this.hasFalling();
  }
}
