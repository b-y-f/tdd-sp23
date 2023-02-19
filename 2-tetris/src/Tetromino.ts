import { RotatingShape } from "./RotatingShape";

export class Tetromino extends RotatingShape {
  constructor(shape: string, orientation: number) {
    super(shape, orientation);
  }

  // Define tetromino shapes as static properties
  public static readonly T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`,
    4
  );
  public static readonly I_SHAPE = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`,
    2
  );
  public static readonly O_SHAPE = new Tetromino(
    `.OO
     .OO
     ...`,
    1
  );
}
