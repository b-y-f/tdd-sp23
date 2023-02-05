import { World } from "./World";

/**
 * this class is UI of this command line RLE to shape program,
 * then node game.js <input.rle> <iter>
 * it will output the shape after n-iter
 */
export class GameOfLife {
  private world: World;
  constructor() {}

  public getWorld(): World {
    return this.world;
  }

  /**
   * encode read file RLE data, then create a new world with width+1 and
   * height + 1(to envolve work)
   * @param input this input is come from command line
   */
  public fromRLE(input: string): void {
    this.initWorld(input);
  }

  private initWorld(input: string) {
    const lines = input.split("\n");
    const noCommentLines = lines.filter((line) => !line.includes("#"));
    const firstLine = noCommentLines[0].split(",");
    const [width, height] = firstLine
      .slice(0, 2)
      .map((e) => Number(e.match(/\d+/)));
    const patternLine = noCommentLines[1];
    this.world = new World(width + 2, height + 2);
    this.decodeRLE(patternLine);
  }

  private decodeRLE(patternString: string): void {
    let currIndex = 0;
    let runCount = 0;

    let row = 1;
    let col = 1;

    while (patternString.charAt(currIndex) !== "!") {
      const char = patternString.charAt(currIndex);

      if (char === "$") {
        row++;
        col = 1;
      } else if (char === "b") {
        if (runCount === 0) {
          col++;
        } else {
          while (runCount != 0) {
            col++;
            runCount--;
          }
        }
      } else if (char === "o") {
        if (runCount === 0) {
          this.world.addCell(row, col);
          col++;
        } else {
          while (runCount != 0) {
            this.world.addCell(row, col);
            col++;
            runCount--;
          }
        }
      } else {
        runCount = 10 * runCount + Number(char);
      }

      currIndex++;
    }
  }
}
