import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  static T_SHAPE = new Tetromino(".T.\nTTT\n...", 4);

  static I_SHAPE = new Tetromino(".....\n.....\nIIII.\n.....\n.....", 2);

  static O_SHAPE = new Tetromino(".OO\n.OO\n...", 1);

  #allRotations;

  #shapeString;

  #distinctShape;

  #currRotationIdx;

  constructor(
    shapeString,
    numDistinctShape,
    currRotation = 0,
    allRotations = undefined
  ) {
    super(shapeString);
    this.#shapeString = shapeString;
    this.#distinctShape = numDistinctShape;
    this.#currRotationIdx = currRotation;

    this.#decideConstructor(
      allRotations,
      numDistinctShape,
      shapeString,
      currRotation
    );
  }

  #decideConstructor(
    allRotations,
    numDistinctShape,
    shapeString,
    currRotation
  ) {
    const defaultConstructor = allRotations === undefined;
    if (defaultConstructor) {
      this.#initRotationShapes(numDistinctShape, shapeString);
    } else {
      this.#updateRotationNumber(currRotation, numDistinctShape, allRotations);
    }
  }

  #updateRotationNumber(currRotation, numDistinctShape, allRotations) {
    this.#currRotationIdx =
      (currRotation + numDistinctShape) % numDistinctShape;
    this.#allRotations = allRotations;
  }

  #initRotationShapes(numDistinctShape, shapeString) {
    this.#allRotations = new Array(numDistinctShape);
    let rotation = new RotatingShape(shapeString);
    for (let i = 0; i < numDistinctShape; i += 1) {
      this.#allRotations[i] = rotation;
      rotation = rotation.rotateRight();
    }
    this.#currRotationIdx = 0;
  }

  rotateRight() {
    return new Tetromino(
      this.#shapeString,
      this.#distinctShape,
      this.#currRotationIdx + 1,
      this.#allRotations
    );
  }

  rotateLeft() {
    return new Tetromino(
      this.#shapeString,
      this.#distinctShape,
      this.#currRotationIdx - 1,
      this.#allRotations
    );
  }

  colorAt(row, col) {
    return this.#currentShape().colorAt(row, col);
  }

  #currentShape() {
    return this.#allRotations[this.#currRotationIdx];
  }

  toString() {
    return this.#currentShape().toString();
  }
}
