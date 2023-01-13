export class Board {
  EMPTY = ".";

  #width;

  #height;

  #falling;

  #fallingBlockRow;

  #fallingBlockCol;

  #stationary;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#fallingBlockCol = Math.round(width / 2) - 1;

    this.#resetFallingRowAndCol();
    this.#initStationary(height, width);
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.#falling = block;
    this.#resetFallingRowAndCol();
  }

  tick() {
    if (this.#hitBottom() || this.#hitFixedBlock()) {
      this.#stopFalling();
    }
    this.#oneTick();
  }

  #oneTick() {
    this.#fallingBlockRow += 1;
  }

  #initStationary(height, width) {
    this.#stationary = Array(height)
      .fill(this.EMPTY)
      .map(() => Array(width).fill(this.EMPTY));
  }

  #hitFixedBlock() {
    return (
      this.#stationary[this.#fallingBlockRow + 1][this.#fallingBlockCol] !==
      this.EMPTY
    );
  }

  #hitBottom() {
    return this.#fallingBlockRow === this.#height - 1;
  }

  #stopFalling() {
    this.#stationary[this.#fallingBlockRow][this.#fallingBlockCol] =
      this.#falling.getColor();
    this.#falling = undefined;
  }

  hasFalling() {
    return this.#falling !== undefined;
  }

  #resetFallingRowAndCol() {
    this.#fallingBlockRow = 0;
    this.#fallingBlockCol = 1;
  }

  #hasFallingAt(row, col) {
    return (
      row === this.#fallingBlockRow &&
      col === this.#fallingBlockCol &&
      this.hasFalling()
    );
  }

  #getColorAt(row, col) {
    return this.#hasFallingAt(row, col)
      ? this.#falling.getColor()
      : this.#stationary[row][col];
  }

  toString() {
    let blockString = "";
    for (let row = 0; row < this.#height; row += 1) {
      for (let col = 0; col < this.#width; col += 1) {
        blockString += this.#getColorAt(row, col);
      }
      blockString += "\n";
    }
    return blockString;
  }
}
