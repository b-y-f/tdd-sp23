import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  static readonly T_SHAPE = new RotatingShape(
    `.T.
     TTT
     ...`
  );
  // static readonly I_SHAPE = new Tetromino([
  //   `.....
  //    .....
  //    IIII.
  //    .....
  //    .....`,
  //   `..I..
  //    ..I..
  //    ..I..
  //    ..I..
  //    .....`,
  // ]);
  // static readonly O_SHAPE = new Tetromino([
  //   `.OO
  //    .OO
  //    ...`,
  // ]);
}
