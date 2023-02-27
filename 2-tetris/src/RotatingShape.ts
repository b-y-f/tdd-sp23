export class RotatingShape {
  private readonly width: number;
  private readonly height: number;
  private readonly shape: string[][];

  constructor(shapeString: string) {
    const rows = shapeString.trim().split("\n");
    this.shape = rows.map((row: string) =>
      row.trim().padEnd(this.width, ".").split("")
    );

    this.height = rows.length;
    this.width = this.shape[0].length;
  }

  public getHeight(): number {
    return this.width;
  }
  public getWidth(): number {
    return this.height;
  }

  public rotateRight(): this {
    return this.rotate();
  }

  public rotateLeft(): this {
    return this.rotate().rotate();
  }

  private rotate(): this {
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
