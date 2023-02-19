export class RotatingShape {
  private shape: string[][];
  private readonly height: number;
  private readonly width: number;

  constructor(shape: string) {
    this.shape = shape
      .trim()
      .split(/\s+/)
      .map((row) => row.split(""));
    this.height = this.shape.length;
    this.width = this.shape[0].length;
  }

  public toString(): string {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
