import { RotatingShape } from "./RotatingShape";

export class Tetromino extends RotatingShape {
  static readonly T_SHAPE = new RotatingShape(
    `.T.
     TTT
     ...`
  );
  static readonly I_SHAPE = new RotatingShape(
    [
      `.....
       .....
       IIII.
       .....
       .....`,
      `..I..
       ..I..
       ..I..
       ..I..
       .....`,
    ],
    0
  );
  static readonly O_SHAPE = new RotatingShape(
    [
      `.OO
       .OO
       ...`,
    ],
    0
  );
}
