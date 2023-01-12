import { RotatingShape } from './RotatingShape.mjs'

export class Tetromino extends RotatingShape {
  constructor (shapeStr, shapeType) {
    super(shapeStr, shapeType)
    // Object.freeze(this);
  }

  static T_SHAPE = new Tetromino('.T.\nTTT\n...', 'T')
  static I_SHAPE = new Tetromino('.....\n.....\nIIII.\n.....\n.....', 'I')
  static O_SHAPE = new Tetromino('.OO\n.OO\n...', 'O')
}
