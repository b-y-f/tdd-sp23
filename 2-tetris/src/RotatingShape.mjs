import { Block } from "./Block.mjs";

export class RotatingShape extends Block {
  shapeType;
  constructor(shapeStr, shapeType) {
    super(shapeStr);
    this.shapeType = shapeType;
  }

  rotateRight() {
    if (this.shapeType === "I") {
      return this.handleIShape();
    }
    if (this.shapeType === "O") {
      return this;
    }
    // this function should return a new Shape
    const copy = this.shapeArray.map((row) => row.slice());
    const newShapeStr = copy[0]
      .map((val, index) => copy.map((row) => row[index]).reverse())
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  rotateLeft() {
    if (this.shapeType === "I") {
      return this.handleIShape();
    }
    if (this.shapeType === "O") {
      return this;
    }
    const copy = this.shapeArray.map((row) => row.slice());
    const newShapeStr = copy[0]
      .map((val, index) => copy.map((row) => row[row.length - 1 - index]))
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  handleIShape() {
    if (this.shapeArray[0][2] === "I") {
      return new RotatingShape(".....\n.....\nIIII.\n.....\n.....", "I");
    } else {
      return new RotatingShape("..I..\n..I..\n..I..\n..I..\n.....", "I");
    }
  }

  toString() {
    return this.shapeArray.map((row) => row.join("")).join("\n") + "\n";
  }
}
