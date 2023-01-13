export class RotatingShape {
  #blocks;

  constructor(blockString) {
    this.#blocks = blockString
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
    this.width = this.#blocks.length;
    this.height = this.#blocks[0].length;
  }

  rotateRight() {
    const copy = this.#blocks.map((row) => row.slice());
    const newShapeStr = copy[0]
      .map((_, index) => copy.map((row) => row[index]).reverse())
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  rotateLeft() {
    const copy = this.#blocks.map((row) => row.slice());
    const newShapeStr = copy[0]
      .map((_, index) => copy.map((row) => row[row.length - 1 - index]))
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  toString() {
    return `${this.#blocks.map((row) => row.join("")).join("\n")}\n`;
  }
}
