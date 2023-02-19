export class RotatingShape {
  private readonly width: number;
  private readonly height: number;
  private readonly shape: string[][];
  private currentStateIndex: number;

  constructor();
  // eslint-disable-next-line no-unused-vars
  constructor(shapeStrings: string[], stateIndex: number);
  // eslint-disable-next-line no-unused-vars
  constructor(shapeString: string);
  constructor(...args: any[]) {
    this.currentStateIndex = -1;

    let shapeString;
    let shapeStrings;
    if (args.length === 1) {
      shapeString = args[0];
    } else {
      shapeStrings = args[0];
      this.currentStateIndex = args[1];
      shapeString = shapeStrings[this.currentStateIndex];
    }

    const rows = shapeString?.trim().split("\n") ?? [];
    this.shape = rows.map((row: string) =>
      row.trim().padEnd(this.width, ".").split("")
    );

    this.height = rows.length;
    this.width = this.shape[0].length;
  }

  public rotateRight(): this {
    return this.updateState();
  }

  public rotateLeft(): this {
    return this.updateState().updateState();
  }

  private updateState(): this {
    // this is rotate right
    const newShape: string[][] = [];
    for (let col = 0; col < this.width; col++) {
      const newRow: string[] = [];
      for (let row = this.height - 1; row >= 0; row--) {
        newRow.push(this.shape[row][col]);
      }
      newShape.push(newRow);
    }
    this.shape.splice(0, this.height, ...newShape);

    return this;
  }

  public toString(): string {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
