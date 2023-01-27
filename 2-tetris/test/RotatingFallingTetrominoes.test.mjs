/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Level 6: Rotating falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });
  describe("a falling tetromino can be rotated  ", () => {
    it("add a falling tetrmo to boar", () => {
      board.tick();
      board.rotateFallingTetrisLeft();
      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ....TT....
         ....T.....
         ..........
         ..........`
      );
    });
  });

  describe("it cannot be rotated when there is no room to rotate", () => {});

  describe("when it is up against a wall and is rotated, but there is no room to rotate, move it away from the wall if possible", () => {});
});
