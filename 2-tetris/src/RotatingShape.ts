export class RotatingShape {
  private readonly width: number;
  private readonly height: number;
  private readonly shape: string[];
  private orientation: number;

  constructor(shape: string) {
    const rows = shape.trim().split("\n");
    this.height = rows.length;
    this.width = rows[0].length;
    this.shape = rows.map((row) => row.trim().padEnd(this.width, "."));
    this.orientation = 0;
  }

  public rotateRight(): this {
    const newShape: string[] = [];
    for (let col = 0; col < this.width; col++) {
      let newRow = "";
      for (let row = this.height - 1; row >= 0; row--) {
        newRow += this.shape[row][col];
      }
      newShape.push(newRow);
    }
    this.shape.splice(0, this.height, ...newShape);
    this.orientation = (this.orientation + 1) % 4;
    return this;
  }

  public rotateLeft(): this {
    const newShape: string[] = [];
    for (let col = this.width - 1; col >= 0; col--) {
      let newRow = "";
      for (let row = 0; row < this.height; row++) {
        newRow += this.shape[row][col];
      }
      newShape.push(newRow);
    }
    this.shape.splice(0, this.height, ...newShape);
    this.orientation = (this.orientation + 3) % 4;
    return this;
  }

  public toString(): string {
    return this.shape.join("\n") + "\n";
  }
}
