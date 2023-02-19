export class RotatingShape {
  private readonly width: number;
  private readonly height: number;
  private readonly shape: string[][];
  private orientation: number;

  constructor(shapeString: string) {
    const rows = shapeString.trim().split("\n");
    this.height = rows.length;
    this.width = rows[0].length;
    this.shape = rows.map((row) =>
      row.trim().padEnd(this.width, ".").split("")
    );
    this.orientation = 0;
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
