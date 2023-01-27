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

  rotateFallingTetrisLeft() {
    this.#falling.item = this.#falling.item.rotateLeft();
  }

  rotateFallingTetrisRight() {
    this.#falling.item = this.#falling.item.rotateRight();
  }

  tick() {
    if (this.#falling.item) {
      if (this.#hitBottom() || this.#hitFixedBlock()) {
        this.#stopFalling();
      }
      this.#oneTick();
    }
  }

  moveLeft() {
    const leftBound = this.#falling.item.getLeftBoundry();
    if (this.#falling.colAtBoard > -leftBound && !this.#hitFixedBlock()) {
      this.#falling.colAtBoard -= 1;
    }
  }

  moveRight() {
    const rightBound = this.#falling.item.getRightBoundry();
    const upperBound = this.#width - rightBound - 1;
    if (this.#falling.colAtBoard < upperBound && !this.#hitFixedBlock()) {
      this.#falling.colAtBoard += 1;
    }
  }

  moveDown() {
    const botBound = this.#falling.item.getBotBoundry();
    const upperBound = this.#height - botBound - 1;
    if (this.#falling.rowAtBoard < upperBound) this.#falling.rowAtBoard += 1;
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
    for (let row = 0; row < this.#falling.item.getHeight(); row += 1) {
      for (let col = 0; col < this.#falling.item.getWidth() + 1; col += 1) {
        if (this.#ifCellNotEmpty(row, col)) {
          const boardRow = this.#falling.rowAtBoard + row;
          const boardCol = this.#falling.colAtBoard + col;
          if (this.#collisionWithNextRow(boardCol, boardRow)) {
            return true;
          }
        }
      }
    }
    return this.#ifFallingAtBoard() ? this.#ifCollision() : false;
  }

  #ifCellNotEmpty(row, col) {
    return this.#falling.item.colorAt(row, col) !== this.EMPTY;
  }

  #collisionWithNextRow(boardCol, boardRow) {
    return (
      this.#ifTetrisInBoard(boardCol, boardRow) &&
      this.#stationary[boardRow + 1][boardCol] !== this.EMPTY
    );
  }

  #ifCollision() {
    return (
      this.#stationary[this.#falling.rowAtBoard][this.#falling.colAtBoard] !==
      this.EMPTY
    );
  }

  #ifTetrisInBoard(boardCol, boardRow) {
    return (
      boardCol >= 0 &&
      boardCol < this.#width &&
      boardRow >= 0 &&
      boardRow + 1 < this.#height
    );
  }

  #ifFallingAtBoard() {
    return (
      this.#falling.rowAtBoard >= 0 &&
      this.#falling.rowAtBoard < this.#height &&
      this.#falling.colAtBoard >= 0 &&
      this.#falling.colAtBoard < this.#width
    );
  }

  #hitBottom() {
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
        this.#makeCellStation(row, col);
      }
    }
    this.#falling.item = undefined;
  }

  #makeCellStation(row, col) {
    const cell = this.#falling.item.colorAt(row, col);
    const boardRow = this.#falling.rowAtBoard + row;
    const boardCol = this.#falling.colAtBoard + col;
    if (cell !== this.EMPTY && boardRow < this.#height) {
      this.#stationary[boardRow][boardCol] = cell;
    }
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
    if (!this.hasFalling()) {
      return this.EMPTY;
    }
    const { item, rowAtBoard, colAtBoard } = this.#falling;
    const fallingRow = row - rowAtBoard;
    const fallingCol = col - colAtBoard;
    return this.#isInBoundry(fallingRow, fallingCol)
      ? item.colorAt(fallingRow, fallingCol)
      : this.EMPTY;
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
