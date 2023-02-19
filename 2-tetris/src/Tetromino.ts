import { RotatingShape } from "./RotatingShape";

export class Tetromino extends RotatingShape {
  static readonly T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`
  );
  static readonly I_SHAPE = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`
  );
  static readonly O_SHAPE = new Tetromino(
    `.OO
     .OO
     ...`
  );

  constructor(shape: string) {
    super(shape);
  }
}
