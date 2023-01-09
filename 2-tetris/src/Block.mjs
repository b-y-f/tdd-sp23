export class Block {
  blockString;
  shapeArray;

  constructor(blockString) {
    this.blockString = blockString;
    this.shapeArray = blockString
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
    // Object.freeze(this);
  }
  getColor() {
    return this.blockString;
  }
}
