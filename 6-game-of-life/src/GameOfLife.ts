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
    const lines = input.split("\n");
    const noCommentLines = lines.filter((line) => !line.includes("#"));
    const firstLine = noCommentLines[0].split(",");
    const [width, height] = firstLine
      .slice(0, 2)
      .map((e) => Number(e.match(/\d+/)));
    const patternLine = noCommentLines[1];

    this.world = new World(width + 2, height + 2);

    const arr = patternLine.split("$");
    for (let i = 0; i < arr.length; i++) {
      this.decodeRLELine(arr[i], i + 1);
    }
  }

  private decodeRLELine(line: string, row: number): void {
    let count = 0;

    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      if (char >= "0" && char <= "9") {
        count = count * 10 + Number(char);
      } else {
        for (let j = 0; j < count; j++) {
          if (char === "o") {
            this.world.addCell(row, j + 1);
          }
        }
      }
    }
  }
}
