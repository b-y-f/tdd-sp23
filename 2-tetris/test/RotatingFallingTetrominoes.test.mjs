/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Level 6: Rotating falling tetrominoes", () => {
  describe("a falling tetromino can be rotated  ", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(Tetromino.T_SHAPE);
    });
    it("add a falling tetrmo to boar", () => {
      board.tick();
      board.rotateFallingTetrisLeft();
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TT.....
         ....T.....
         ..........
         ..........`
      );
    });

    it("add a falling tetrmo to boar", () => {
      board.tick();
      board.tick();
      board.rotateFallingTetrisRight();
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....T.....
         ....TT....
         ....T.....
         ..........`
      );
    });
  });

  function tickManyTimes(board) {
    for (let i = 0; i < 20; i += 1) {
      board.tick();
    }
  }

  describe("it cannot be rotated when there is no room to rotate", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      tickManyTimes(board);

      board.drop(Tetromino.O_SHAPE);
      board.moveRight();
      board.moveRight();
      tickManyTimes(board);

      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.rotateFallingTetrisLeft();
      board.rotateFallingTetrisLeft();
      board.tick();
      board.tick();
      board.rotateFallingTetrisLeft();
    });
    it("x", () => {
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ....TTT...
         ...OOTOO..
         ...OO.OO..`
      );
    });
  });

  describe("when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {});
});
