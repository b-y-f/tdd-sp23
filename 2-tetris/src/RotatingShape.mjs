export class RotatingShape {
  constructor(shapeStr) {
    this.shape = shapeStr
      .split("\n")
      .map((s) => s.replace(/\s+/g, "").split(""));
    Object.freeze(this);
  }

  rotateRight() {
    // this function should return a new Shape
    let copy = this.shape.map((row) => row.slice());
    let newShapeStr = copy[0]
      .map((val, index) => copy.map((row) => row[index]).reverse())
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  rotateLeft() {
    let copy = this.shape.map((row) => row.slice());
    let newShapeStr = copy[0]
      .map((val, index) => copy.map((row) => row[row.length - 1 - index]))
      .map((row) => row.join(""))
      .join("\n");
    return new RotatingShape(newShapeStr);
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
