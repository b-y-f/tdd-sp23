import { expect } from "chai";
import { Board } from "../src/Board.mjs";

import { Tetromino } from "../src/Tetromino.mjs";

describe("Test within range", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.S_SHAPE);
  });

  it("a falling tetromino can be moved left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...SS.....
       ..SS......
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("a falling tetromino can be moved right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....SS...
       ....SS....
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("a falling tetromino can be moved down", () => {
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....SS....
       ...SS.....
       ..........
       ..........
       ..........`
    );
  });
});

function manyMovesLeft(board) {
  for (let i = 0; i < 20; i += 1) {
    board.moveLeft();
  }
}
function manyMovesRigth(board) {
  for (let i = 0; i < 20; i += 1) {
    board.moveRight();
  }
}
function manyMovesDown(board) {
  for (let i = 0; i < 20; i += 1) {
    board.moveDown();
  }
}

describe("Edge cases: board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.S_SHAPE);
  });
  it("it cannot be moved left beyond the board", () => {
    manyMovesLeft(board);
    expect(board.toString()).to.equalShape(
      `.SS.......
       SS........
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("it cannot be moved right beyond the board", () => {
    manyMovesRigth(board);
    expect(board.toString()).to.equalShape(
      `........SS
       .......SS.
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("it cannot be moved down beyond the board", () => {
    manyMovesDown(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....SS....
       ...SS.....`
    );
  });
});

function tickManyTimes(board) {
  for (let i = 0; i < 20; i += 1) {
    board.tick();
  }
}

describe("Edge cases: other blocks", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.O_SHAPE);
    manyMovesLeft(board);
    manyMovesDown(board);
    tickManyTimes(board);
    board.drop(Tetromino.O_SHAPE);
  });
  it("it cannot be moved left through other blocks", () => {
    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       OO........
       OO........`
    );

    manyMovesDown(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       OO..OO....
       OO..OO....`
    );

    manyMovesLeft(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       OOOO......
       OOOO......`
    );
  });
  it("it cannot be moved right through other blocks", () => {});
  it("it cannot be moved down through other blocks", () => {});
});
