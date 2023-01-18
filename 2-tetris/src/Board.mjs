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
    if (this.#falling) {
      this.#falling.item = block;
      this.#resetFallingRowAndCol();
    }
  }

  tick() {
    if (this.#falling.item) {
      if (this.#hitBottom() || this.#hitFixedBlock()) {
        this.#stopFalling();
      }
      this.#oneTick();
    }
  }

  #oneTick() {
    if (this.#falling) {
      this.#falling.rowAtBoard += 1;
    }
  }

  #initStationary(height, width) {
    this.#stationary = Array(height)
      .fill(this.EMPTY)
      .map(() => Array(width).fill(this.EMPTY));
  }

  #hitFixedBlock() {
    for (let row = 0; row < this.#falling.item.getHeight(); row += 1) {
      for (let col = 0; col < this.#falling.item.getWidth(); col += 1) {
        const cell = this.#falling.item.colorAt(row, col);
        if (cell !== this.EMPTY) {
          const boardRow = this.#falling.rowAtBoard + row;
          const boardCol = this.#falling.colAtBoard + col;
          if (this.#stationary[boardRow + 1][boardCol] !== this.EMPTY) {
            return true;
          }
        }
      }
    }
    return (
      this.#stationary[this.#falling.rowAtBoard][this.#falling.colAtBoard] !==
      this.EMPTY
    );
  }

  #hitBottom() {
    if (!this.hasFalling()) {
      return false;
    }

    for (let row = 0; row < this.#falling.item.getHeight(); row += 1) {
      for (let col = 0; col < this.#falling.item.getWidth(); col += 1) {
        if (this.#falling.item.colorAt(row, col) !== this.EMPTY) {
          if (this.#falling.rowAtBoard + row >= this.#height - 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  #stopFalling() {
    for (let row = 0; row < this.#falling.item.getHeight(); row += 1) {
      for (let col = 0; col < this.#falling.item.getWidth(); col += 1) {
        const cell = this.#falling.item.colorAt(row, col);
        const boardRow = this.#falling.rowAtBoard + row;
        const boardCol = this.#falling.colAtBoard + col;
        if (cell !== this.EMPTY && boardRow < this.#height) {
          this.#stationary[boardRow][boardCol] = cell;
        }
      }
    }
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
