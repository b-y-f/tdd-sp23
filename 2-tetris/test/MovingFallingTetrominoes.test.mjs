import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";

const SShape = new RotatingShape(".SS\nSS.\n...");

describe("Test within range", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(SShape);
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

function manyMoves(fn) {
  for (let i = 0; i < 20; i += 1) {
    fn();
  }
}

describe("Edge cases: board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(SShape);
  });
  it("it cannot be moved left beyond the board", () => {
    manyMoves(board.moveLeft);
    expect(board.toString()).to.equalShape(
      `.SS.......
       SS........
       ..........
       ..........
       ..........
       ..........`
    );
  });
  it("it cannot be moved right beyond the board", () => {});
  it("it cannot be moved down beyond the board", () => {});
});

describe("Edge cases: other blocks", () => {
  it("it cannot be moved left through other blocks", () => {});
  it("it cannot be moved right through other blocks", () => {});
  it("it cannot be moved down through other blocks", () => {});
});
