import { RotatingTetromino } from "./RotatingTetromino";

export class Tetromino {
  static readonly T_SHAPE = new RotatingTetromino(
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
    1,
    "T"
  );
  static readonly I_SHAPE = new RotatingTetromino(
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
    0,
    "I"
  );
  static readonly O_SHAPE = new RotatingTetromino(
    [
      `.OO
       .OO
       ...`,
    ],
    0,
    "O"
  );
  static readonly S_SHAPE = new RotatingTetromino(
    [
      `.SS
       SS.
       ...`,
      `S..
       SS.
       .S.`,
    ],
    0,
    "S"
  );
}
