// /* eslint-disable no-plusplus */
// import { expect } from "chai";
// import { Board } from "../src/Board";
// import { Tetromino } from "../src/Tetromino";

// function fallToBottom(board: Board): void {
//   for (let i = 0; i < 10; i++) {
//     board.tick();
//   }
// }

// describe("Falling tetrominoes", () => {
//   let board;
//   beforeEach(() => {
//     board = new Board(10, 6);
//   });

//   it("start from the top middle", () => {
//     board.drop(Tetromino.T_SHAPE);

//     expect(board.toString()).to.equalShape(
//       `....T.....
//        ...TTT....
//        ..........
//        ..........
//        ..........
//        ..........`
//     );
//   });

//   it("stop when they hit the bottom", () => {
//     board.drop(Tetromino.T_SHAPE);
//     fallToBottom(board);

//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ..........
//        ..........
//        ....T.....
//        ...TTT....`
//     );
//   });

//   it("stop when they land on another block", () => {
//     board.drop(Tetromino.T_SHAPE);
//     fallToBottom(board);
//     board.drop(Tetromino.T_SHAPE);
//     fallToBottom(board);

//     expect(board.toString()).to.equalShape(
//       `..........
//        ..........
//        ....T.....
//        ...TTT....
//        ....T.....
//        ...TTT....`
//     );
//   });
// });
