export class RotatingShape {
  #blocks;

  constructor(blockString) {
    this.#blocks = blockString
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
    this.width = this.#blocks.length;
    this.height = this.#blocks[0].length;
  }

  toString() {
    return `${this.#blocks.map((row) => row.join("")).join("\n")}\n`;
  }
}
