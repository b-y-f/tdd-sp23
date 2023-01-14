import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  static T_SHAPE = new Tetromino(".T.\nTTT\n...", 4, 0, undefined);

  static I_SHAPE = new Tetromino(
    ".....\n.....\nIIII.\n.....\n.....",
    2,
    0,
    undefined
  );

  static O_SHAPE = new Tetromino(".OO\n.OO\n...", 1, 0, undefined);

  #allRotations;

  #shapeString;

  #distinctShape;

  #currRotation;

  constructor(shapeString, numDistinctShape, currRotation, allRotations) {
    super(shapeString);
    this.#shapeString = shapeString;
    this.#distinctShape = numDistinctShape;
    this.#currRotation = currRotation;

    if (allRotations === undefined) {
      this.#allRotations = new Array(numDistinctShape);
      let rotation = new RotatingShape(shapeString);
      for (let i = 0; i < numDistinctShape; i += 1) {
        this.#allRotations[i] = rotation;
        rotation = rotation.rotateRight();
      }

      this.#currRotation = 0;
    } else {
      this.#currRotation = (currRotation + numDistinctShape) % numDistinctShape;
      this.#allRotations = allRotations;
    }
  }

  rotateRight() {
    return new Tetromino(
      this.#shapeString,
      this.#distinctShape,
      this.#currRotation + 1,
      this.#allRotations
    );
  }

  rotateLeft() {
    return new Tetromino(
      this.#shapeString,
      this.#distinctShape,
      this.#currRotation - 1,
      this.#allRotations
    );
  }

  toString() {
    return this.#allRotations[this.#currRotation].toString();
  }
}
