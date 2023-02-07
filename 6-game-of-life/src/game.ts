/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * read raw data, parse it with GameOfLife class
 * call toRle to write result to a new RLE file
 */

import { GameOfLife } from "./GameOfLife";
import { readFileSync } from "fs";

const fileName = process.argv[2];
const numOfIter = process.argv[3];

const pattern = readFileToStr(fileName);

const game = new GameOfLife();
game.fromRLE(pattern);
game.iterEvolve(Number(numOfIter));
console.log(game.toRLE());

function readFileToStr(fileName: string): string {
  return readFileSync(fileName, "utf-8");
}
