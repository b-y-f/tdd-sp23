export class RotatingShape {
  constructor(shapeStr) {
    this.shape = shapeStr
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
  }

  rotateRight() {
    // this function should return a new Shape
    let newShapeStr = this.shape[0]
      .map((val, index) => this.shape.map((row) => row[index]).reverse())
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  rotateLeft() {
    let newShapeStr = (this.shape = this.shape[0]
      .map((val, index) => this.shape.map((row) => row[row.length - 1 - index]))
      .map((row) => row.join(""))
      .join("\n"));
    return new RotatingShape(newShapeStr);
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
