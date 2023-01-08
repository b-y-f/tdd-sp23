export class RotatingShape {
  constructor(shapeStr, shapeType) {
    this.shapeType = shapeType;
    this.shape = shapeStr
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
    Object.freeze(this);
  }

  rotateRight() {
    if (this.shapeType === "I") {
      return this.handleIShape();
    }
    // this function should return a new Shape
    let copy = this.shape.map((row) => row.slice());
    let newShapeStr = copy[0]
      .map((val, index) => copy.map((row) => row[index]).reverse())
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  rotateLeft() {
    if (this.shapeType === "I") {
      return this.handleIShape();
    }
    let copy = this.shape.map((row) => row.slice());
    let newShapeStr = copy[0]
      .map((val, index) => copy.map((row) => row[row.length - 1 - index]))
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  handleIShape() {
    if (this.shape[0][2] === "I") {
      return new RotatingShape(".....\n.....\nIIII.\n.....\n.....", "I");
    } else {
      return new RotatingShape("..I..\n..I..\n..I..\n..I..\n.....", "I");
    }
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
