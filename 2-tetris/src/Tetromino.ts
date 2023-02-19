import { RotatingShape } from "./RotatingShape";

export class Tetromino extends RotatingShape {
  constructor(shape: string) {
    super(shape);
  }

  // Define tetromino shapes as static properties
  public static readonly T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`
  );
  public static readonly I_SHAPE = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`
  );
  public static readonly O_SHAPE = new Tetromino(
    `.OO
     .OO
     ...`
  );
}
