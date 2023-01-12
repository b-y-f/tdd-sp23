export class Block {
  constructor(blockString) {
    this.blockString = blockString;
    this.shapeArray = blockString
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
    // Object.freeze(this);
    this.width = this.shapeArray.length;
    this.height = this.shapeArray[0].length;
  }
}
