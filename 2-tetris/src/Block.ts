export class Block {
  private color: string;
  constructor(color: string) {
    this.color = color;
  }

  public getColor(): string {
    return this.color;
  }
}
