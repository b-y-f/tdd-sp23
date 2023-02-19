import { expect } from "chai";
import { Board } from "../src/Board";
import { Block } from "../src/Block";

describe("Falling blocks", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(3, 3);
  });

  it("The board starts empty", () => {
    // @ts-ignore
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  describe("When a block is dropped", () => {
    beforeEach(() => {
      board.drop(new Block("X"));
    });

    it("it starts from the top middle", () => {
      // @ts-ignore
      expect(board.toString()).to.equalShape(
        `.X.
         ...
         ...`
      );
    });

    it("it moves down one row per tick", () => {
      board.tick();
      // @ts-ignore
      expect(board.toString()).to.equalShape(
        `...
         .X.
         ...`
      );
    });

    it("at most one block may be falling at a time", () => {
      const before = board.toString();
      expect(() => board.drop(new Block("Y"))).to.throw("already falling");
      const after = board.toString();
      expect(after).to.equal(before);
    });
  });

  describe("When a block reaches the bottom", () => {
    beforeEach(() => {
      board.drop(new Block("X"));
      board.tick();
      board.tick();
    });

    it("it is still moving on the last row", () => {
      // @ts-ignore
      expect(board.toString()).to.equalShape(
        `...
         ...
         .X.`
      );
      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    });

    it("it stops when it hits the bottom", () => {
      board.tick();
      // @ts-ignore
      expect(board.toString()).to.equalShape(
        `...
         ...
         .X.`
      );
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
  });

  describe("When a block lands on another block", () => {
    beforeEach(() => {
      board.drop(new Block("X"));
      board.tick();
      board.tick();
      board.tick();
      board.drop(new Block("Y"));
      board.tick();
    });

    it("it is still moving on the row above the other block", () => {
      // @ts-ignore
      expect(board.toString()).to.equalShape(
        `...
         .Y.
         .X.`
      );
      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    });

    xit("it stops when it hits the other block", () => {
      board.tick();

      // @ts-ignore
      expect(board.toString()).to.equalShape(
        `...
         .Y.
         .X.`
      );
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
  });
});
