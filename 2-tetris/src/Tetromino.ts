import { RotatingTetromino } from "./RotatingTetromino";

export class Tetromino {
  static T_SHAPE = new RotatingTetromino(
    [
      `.T.
       TT.
       .T.`,
      `.T.
       TTT
       ...`,
      `.T.
       .TT
       .T.`,
      `...
       TTT
       .T.`,
    ],
    1
  );
  static I_SHAPE = new RotatingTetromino(
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
  static readonly O_SHAPE = new RotatingTetromino(
    [
      `.OO
       .OO
       ...`,
    ],
    0
  );
}
