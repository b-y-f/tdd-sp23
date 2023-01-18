export class RotatingShape {
  #blocks;

  #width;

  #height;

  constructor(blockString) {
    this.#initBlocks(blockString);
    this.width = this.#blocks.length;
    this.height = this.#blocks[0].length;
    Object.freeze(this);
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  #initBlocks(blockString) {
    this.#blocks = blockString
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
  }

  rotateRight() {
    const copy = this.#cloneBlocks();
    const newShapeStr = copy[0]
      .map((_, index) => copy.map((row) => row[index]).reverse())
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  rotateLeft() {
    const copy = this.#cloneBlocks();
    const newShapeStr = copy[0]
      .map((_, index) => copy.map((row) => row[row.length - 1 - index]))
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  colorAt(row, col) {
    return this.#blocks[row][col];
  }

  #cloneBlocks() {
    return this.#blocks.map((row) => row.slice());
  }

  toString() {
    return `${this.#blocks.map((row) => row.join("")).join("\n")}\n`;
  }
}
