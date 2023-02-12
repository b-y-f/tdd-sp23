// import { expect } from "chai";
// import { Board } from "../src/Board";

// import { Tetromino } from "../src/Tetromino";

// describe("Test within range", () => {
//   let board;
//   beforeEach(() => {
//     board = new Board(10, 6);
//     board.drop(Tetromino.S_SHAPE);
//   });

//   it("a falling tetromino can be moved left", () => {
//     board.moveLeft();
//     expect(board.toString()).to.equalShape(
//       `...SS.....
//        ..SS......
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });
//   it("a falling tetromino can be moved right", () => {
//     board.moveRight();
//     expect(board.toString()).to.equalShape(
//       `.....SS...
//        ....SS....
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });
//   it("a falling tetromino can be moved down", () => {
//     board.moveDown();
//     expect(board.toString()).to.equalShape(
//       `..........
//        ....SS....
//        ...SS.....
//        ..........
//        ..........
//        ..........`
//     );
//   });
// });

// function manyMovesLeft(board) {
//   for (let i = 0; i < 20; i += 1) {
//     board.moveLeft();
//   }
// }
// function manyMovesRight(board) {
//   for (let i = 0; i < 20; i += 1) {
//     board.moveRight();
//   }
// }
// function manyMovesDown(board) {
//   for (let i = 0; i < 20; i += 1) {
//     board.moveDown();
//   }
// }

// function tickManyTimes(board) {
//   for (let i = 0; i < 20; i += 1) {
//     board.tick();
//   }
// }

// describe("Edge cases: board", () => {
//   let board;
//   beforeEach(() => {
//     board = new Board(10, 6);
//     board.drop(Tetromino.S_SHAPE);
//   });
//   it("it cannot be moved left beyond the board", () => {
//     manyMovesLeft(board);
//     expect(board.toString()).to.equalShape(
//       `.SS.......
//        SS........
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });
//   it("it cannot be moved right beyond the board", () => {
//     manyMovesRight(board);
//     expect(board.toString()).to.equalShape(
//       `........SS
//        .......SS.
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });
//   it("it cannot be moved down beyond the board", () => {
//     tickManyTimes(board);
//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ..........
//        ..........
//        ....SS....
//        ...SS.....`
//     );
//   });
// });

// describe("Edge cases: other blocks", () => {
//   let board;
//   beforeEach(() => {
//     board = new Board(10, 6);
//   });
//   it("drop first tetris", () => {
//     board.drop(Tetromino.O_SHAPE);
//     expect(board.toString()).to.equalShape(
//       `....OO....
//        ....OO....
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });

//   it("move first tetris to left", () => {
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesLeft(board);
//     expect(board.toString()).to.equalShape(
//       `OO........
//        OO........
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });

//   it("tick first tetris to bottom", () => {
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesLeft(board);
//     tickManyTimes(board);
//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ..........
//        ..........
//        OO........
//        OO........`
//     );
//   });

//   it("drop second tetris", () => {
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesLeft(board);
//     tickManyTimes(board);
//     board.drop(Tetromino.O_SHAPE);
//     expect(board.toString()).to.equalShape(
//       `....OO....
//        ....OO....
//        ..........
//        ..........
//        OO........
//        OO........`
//     );
//   });

//   it("drop second to bottom", () => {
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesLeft(board);
//     tickManyTimes(board);
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesDown(board);
//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ..........
//        ..........
//        OO..OO....
//        OO..OO....`
//     );
//   });
//   it("it cannot be moved left through other blocks", () => {
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesLeft(board);
//     tickManyTimes(board);
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesDown(board);
//     manyMovesLeft(board);
//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ..........
//        ..........
//        OOOO......
//        OOOO......`
//     );
//   });

//   it("it cannot be moved right through other blocks", () => {
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesRight(board);
//     tickManyTimes(board);
//     board.drop(Tetromino.O_SHAPE);
//     manyMovesDown(board);
//     manyMovesRight(board);
//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ..........
//        ..........
//        ......OOOO
//        ......OOOO`
//     );
//   });
//   it("it cannot be moved down through other blocks", () => {
//     board.drop(Tetromino.O_SHAPE);
//     tickManyTimes(board);
//     board.drop(Tetromino.O_SHAPE);
//     tickManyTimes(board);
//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ....OO....
//        ....OO....
//        ....OO....
//        ....OO....`
//     );
//   });
// });
