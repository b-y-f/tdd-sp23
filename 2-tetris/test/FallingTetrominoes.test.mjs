import { expect } from 'chai'
import { Board } from '../src/Board.mjs'
import { Tetromino } from '../src/Tetromino.mjs'

function fallToBottom (board) {
  for (let i = 0; i < 10; i++) {
    board.tick()
  }
}

describe('Falling tetrominoes', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })

  it('start from the top middle', () => {
    board.drop(Tetromino.T_SHAPE)

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    )
  })

  it('stop when they hit the bottom', () => {
    board.drop(Tetromino.T_SHAPE)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    )
  })

  it('stop when they land on another block', () => {
    board.drop(Tetromino.T_SHAPE)
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    )
  })
})

describe('Some of my own test for other shapes', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })
  // it("middle point should be ")
  it('Test O shape drop to board', () => {
    board.drop(Tetromino.O_SHAPE)

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    )
  })
  it('test O shape one tick', () => {
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ....OO....
       ....OO....
       ..........
       ..........
       ..........`
    )
  })
})

describe('Some of I shape drops', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })
  // it("middle point should be ")
  xit('Test O shape drop to board', () => {
    board.drop(Tetromino.I_SHAPE)

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    )
  })
})
