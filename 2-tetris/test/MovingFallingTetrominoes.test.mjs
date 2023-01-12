import { expect } from 'chai'
import { Board } from '../src/Board.mjs'
import { Tetromino } from '../src/Tetromino.mjs'

describe('Control Falling tetrominos', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
    board.drop(Tetromino.T_SHAPE)
  })

  xit('a falling tetromino can be moved left', () => {
    board.left()
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    )
  })

  xit('a falling tetromino can be moved right', () => {
    board.right()
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    )
  })

  xit('a falling tetromino can be moved down', () => {
    board.down()
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .....T....
       ....TTT...`
    )
  })
})

describe("Edge case, can't move beyond board", () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
    board.drop(Tetromino.T_SHAPE)
  })

  xit('it cannot be moved left beyond the board', () => {
    for (let i = 0; i < 6; i++) {
      board.left()
    }
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    )
  })

  xit('it cannot be moved right beyond the board', () => {
    for (let i = 0; i < 20; i++) {
      board.right()
    }
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    )
  })

  xit('it cannot be moved down beyond the board (will stop falling)', () => {
    for (let i = 0; i < 20; i++) {
      board.down()
    }
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ........T.
       .......TTT`
    )
  })
})

// it cannot be moved left through other blocks
// it cannot be moved right through other blocks
// it cannot be moved down through other blocks (will stop falling)
