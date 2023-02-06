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

  public toRLE(): string {
    let s = "";

    const currWorld = this.getWorld();
    const height = currWorld.getHeight();
    const width = currWorld.getWidth();
    let runCount = 1;

    s += `x = ${width - 2}, y = ${height - 2}\n`;

    for (let row = 1; row < height - 1; row++) {
      for (let col = 1; col < width - 1; col++) {
        const currCell = currWorld.getCell(row, col).isAlive ? 1 : 0;
        const nextCell = this.getNextCell(col, width, currWorld, row);
        if (currCell === nextCell) {
          runCount++;
        } else {
          s += (runCount === 1 ? "" : runCount) + (currCell === 1 ? "o" : "b");
          runCount = 1;
        }
      }
      s += "$";
    }
    s = s.slice(0, -1) + "!";
    return s;
  }

  private getNextCell(
    col: number,
    width: number,
    currWorld: World,
    row: number
  ): number {
    return col + 1 < width
      ? currWorld.getCell(row, col + 1).isAlive
        ? 1
        : 0
      : -1;
  }

  /**
   * call evolve function in world n times
   * @param n this is number of iteration
   */
  public iterEvolve(n: number): void {
    for (let i = 0; i < n; i++) {
      this.world.evolve();
      this.world.resize();
    }
  }

  private initWorld(input: string): void {
    const lines = input.split("\n");
    const noCommentLines = lines.filter((line) => !line.includes("#"));
    const firstLine = noCommentLines[0].split(",");
    const [width, height] = firstLine
      .slice(0, 2)
      .map((e) => Number(e.match(/\d+/)));
    const patternLines = noCommentLines.slice(1);
    this.world = new World(width + 2, height + 2);
    this.decodeRLE(patternLines.join(""));
  }

  private decodeRLE(patternString: string): void {
    let currIndex = 0;
    let runCount = 0;

    let row = 1;
    let col = 1;

    while (patternString.charAt(currIndex) !== "!") {
      const char = patternString.charAt(currIndex);

      if (char === "$") {
        if (runCount === 0) {
          row++;
          col = 1;
        } else {
          while (runCount != 0) {
            row++;
            col = 1;
            runCount--;
          }
        }
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
