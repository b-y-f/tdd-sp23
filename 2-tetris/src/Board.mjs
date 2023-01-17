export class Board {
  EMPTY = ".";

  #width;

  #height;

  #falling;

  #stationary;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#falling = {
      item: undefined,
    };
    this.#resetFallingRowAndCol();
    this.#initStationary(height, width);
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.#falling.item = block;
    this.#resetFallingRowAndCol();
  }

  tick() {
    if (this.#hitBottom() || this.#hitFixedBlock()) {
      this.#stopFalling();
    }
    this.#oneTick();
  }

  #oneTick() {
    this.#falling.row += 1;
  }

  #initStationary(height, width) {
    this.#stationary = Array(height)
      .fill(this.EMPTY)
      .map(() => Array(width).fill(this.EMPTY));
  }

  #hitFixedBlock() {
    return (
      this.#stationary[this.#falling.row + 1][this.#falling.col] !== this.EMPTY
    );
  }

  #hitBottom() {
    return this.#falling.row === this.#height - 1;
  }

  #stopFalling() {
    this.#stationary[this.#falling.row][this.#falling.col] =
      this.#falling.item.getColor();
    this.#falling.item = undefined;
  }

  hasFalling() {
    return this.#falling.item !== undefined;
  }

  #resetFallingRowAndCol() {
    this.#falling.col = Math.round(this.#width / 2) - 1;
    this.#falling.row = 0;
  }

  #hasFallingAt(row, col) {
    return (
      row === this.#falling.row &&
      col === this.#falling.col &&
      this.hasFalling()
    );
  }

  #getColorAt(row, col) {
    if (this.#hasFallingAt(row, col)) {
      return this.#falling.item.getColor();
    }
    return this.#stationary[row][col];
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
