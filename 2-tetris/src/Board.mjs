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
    this.#falling.rowAtBoard += 1;
  }

  #initStationary(height, width) {
    this.#stationary = Array(height)
      .fill(this.EMPTY)
      .map(() => Array(width).fill(this.EMPTY));
  }

  #hitFixedBlock() {
    return (
      this.#stationary[this.#falling.rowAtBoard + 1][
        this.#falling.colAtBoard
      ] !== this.EMPTY
    );
  }

  #hitBottom() {
    return this.#falling.rowAtBoard === this.#height - 1;
  }

  #stopFalling() {
    this.#stationary[this.#falling.rowAtBoard][this.#falling.colAtBoard] =
      this.#falling.item.getColor();
    this.#falling.item = undefined;
  }

  hasFalling() {
    return this.#falling.item !== undefined;
  }

  #resetFallingRowAndCol() {
    this.#falling.colAtBoard = Math.round(this.#width / 2) - 1;
    this.#falling.rowAtBoard = 0;
  }

  #hasFallingAt(row, col) {
    if (!this.hasFalling()) {
      return false;
    }
    return (
      row >= this.#falling.rowAtBoard &&
      row < this.#falling.rowAtBoard + this.#falling.item.getHeight() &&
      col >= this.#falling.colAtBoard &&
      col < this.#falling.colAtBoard + this.#falling.item.getWidth()
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
