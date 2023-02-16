export class Block {
  private color: string;
  private x: number;
  private y: number;
  constructor(color: string) {
    this.color = color;

    this.x = 1;
    this.y = 0;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getColor(): string {
    return this.color;
  }

  public moveDown(): void {
    this.y++;
  }
}
