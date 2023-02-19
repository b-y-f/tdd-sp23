export class RotatingShape {
  private readonly width: number;
  private readonly height: number;
  private readonly shape: string[][];
  private orientation: number;

  constructor();
  // eslint-disable-next-line no-unused-vars
  constructor(shapeString: string);
  // eslint-disable-next-line no-unused-vars
  constructor(shapeString: string, orientation: number);
  constructor(...args: any[]) {
    let shapeString: string | undefined;
    let orientation: number | undefined;

    shapeString = args[0];
    if (args.length === 2) {
      orientation = args[1];
    }
    const rows = shapeString?.trim().split("\n") ?? [];

    this.shape = rows.map((row) =>
      row.trim().padEnd(this.width, ".").split("")
    );

    this.height = rows.length;
    this.width = this.shape[0].length;
    this.orientation = orientation || 0;
  }

  public rotateRight(): this {
    const newShape: string[][] = [];
    for (let col = 0; col < this.width; col++) {
      const newRow: string[] = [];
      for (let row = this.height - 1; row >= 0; row--) {
        newRow.push(this.shape[row][col]);
      }
      newShape.push(newRow);
    }
    this.shape.splice(0, this.height, ...newShape);
    this.orientation = (this.orientation + 1) % 4;
    return this;
  }

  public rotateLeft(): this {
    return this.rotateRight().rotateRight();
  }

  public toString(): string {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
