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
    } else {
      this.#oneTick();
    }
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
      this.#falling.item.colorAt(0, 0);
    this.#falling.item = undefined;
  }

  hasFalling() {
    return this.#falling.item !== undefined;
  }

  #resetFallingRowAndCol() {
    this.#falling.colAtBoard =
      Math.round(this.#width / 2) -
      Math.round(this.#falling.item ? this.#falling.item.getWidth() / 2 : 0);
    this.#falling.rowAtBoard = 0;
  }

  #fallingAt(row, col) {
    const fallingRow = row - this.#falling.rowAtBoard;
    const fallingCow = col - this.#falling.colAtBoard;
    if (this.hasFalling() && this.#isInBoundry(fallingRow, fallingCow)) {
      return this.#falling.item.colorAt(fallingRow, fallingCow);
    }
    return this.EMPTY;
  }

  #colorAt(row, col) {
    const color = this.#fallingAt(row, col);
    if (color !== this.EMPTY) {
      return color;
    }
    return this.#stationary[row][col];
  }

  #isInBoundry(row, col) {
    return (
      row >= 0 &&
      row < this.#falling.item.getHeight() &&
      col >= 0 &&
      col < this.#falling.item.getWidth()
    );
  }

  toString() {
    let blockString = "";
    for (let row = 0; row < this.#height; row += 1) {
      for (let col = 0; col < this.#width; col += 1) {
        blockString += this.#colorAt(row, col);
      }
      blockString += "\n";
    }
    return blockString;
  }
}
