import { World } from "./World";

/**
 * this class is UI of this command line RLE to shape program,
 * then node game.js <input.rle> <iter>
 * it will output the shape after n-iter
 */
export class GameOfLife {
  private LINE_LIMIT = 70;
  private currGeneration;
  private world: World;
  private rle: string;
  constructor() {
    this.currGeneration = 0;
  }

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

  /**
   * Should be make it accept parameter, then it would be easier to
   * unit test it with var.
   * @returns encoded world to RLE string
   */
  public toRLE(): string {
    var { height, width, runCount, newlineCount } = this.initMetaOfRLE();

    for (let row = 1; row < height - 1; row += 1) {
      runCount = this.encodeCells(width, row, runCount);
      newlineCount = this.encodeNewLines(row, width, newlineCount);
    }
    this.rle += "!";

    return this.splitString(this.rle, this.LINE_LIMIT);
  }

  /**
   * helper function to make split line not so headache..
   * @param str
   * @param size
   * @returns string that split new line by LINE_LIMIT
   */
  private splitString(str: string, size: number): string {
    const chunks = str.match(new RegExp(".{1," + size + "}", "g"));
    return chunks.join("\n");
  }

  private encodeNewLines(
    row: number,
    width: number,
    newlineCount: number
  ): number {
    const nextRowEmpty = this.isRowAllDead(row + 1, width, this.world);

    if (nextRowEmpty) {
      newlineCount += 1;
    } else {
      if (newlineCount === 1) {
        this.rle += "$";
      } else {
        this.rle += newlineCount + "$";
      }
      newlineCount = 1;
    }
    return newlineCount;
  }

  private encodeCells(width: number, row: number, runCount: number): number {
    for (let col = 1; col < width - 1; col += 1) {
      const currCell = this.world.getCell(row, col).isAlive ? 1 : 0;
      const nextCell = this.getNextCell(col, width, this.world, row);
      if (currCell === nextCell) {
        runCount += 1;
      } else {
        if (runCount === 1) {
          /* empty */
        } else {
          this.rle += runCount;
        }
        this.rle += currCell === 1 ? "o" : "b";
        runCount = 1;
      }
    }
    runCount = 1;
    return runCount;
  }

  private initMetaOfRLE(): {
    height: number;
    width: number;
    runCount: number;
    newlineCount: number;
  } {
    this.rle = "";
    const height = this.world.getHeight();
    const width = this.world.getWidth();
    let runCount = 1;
    let newlineCount = 1;
    this.rle += `x = ${width - 2}, y = ${height - 2}\n`;
    return { height, width, runCount, newlineCount };
  }

  private isRowAllDead(row: number, width: number, currWorld: World): boolean {
    for (let col = 1; col < width - 1; col++) {
      if (currWorld.getCell(row, col).isAlive) {
        return false;
      }
    }
    return true;
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
      this.currGeneration++;
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
    let currIndex = 0,
      runCount = 0,
      row = 1,
      col = 1;

    while (patternString.charAt(currIndex) !== "!") {
      const char = patternString.charAt(currIndex);

      switch (char) {
        case "$":
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
          break;
        case "b":
          if (runCount === 0) {
            col++;
          } else {
            while (runCount != 0) {
              col++;
              runCount--;
            }
          }
          break;
        case "o":
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
          break;

        default:
          runCount = 10 * runCount + Number(char);
          break;
      }

      currIndex++;
    }
  }
}
