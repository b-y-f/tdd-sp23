import { Block } from "./Block";
import { RotatingShape } from "./RotatingShape";

export class RotatingTetromino extends Block {
  private readonly states: string[];
  private currentStateIndex: number;

  constructor(states: string[], currentStateIndex: number, color: string) {
    super(color);
    this.states = states;
    this.currentStateIndex = currentStateIndex;
  }

  public rotateRight(): RotatingTetromino {
    this.currentStateIndex = (this.currentStateIndex + 1) % this.states.length;
    return this;
  }

  public rotateLeft(): RotatingTetromino {
    this.currentStateIndex =
      (this.currentStateIndex - 1 + this.states.length) % this.states.length;

    return this;
  }

  public toString(): string {
    const curr = new RotatingShape(this.states[this.currentStateIndex]);
    return curr.toString();
  }
}
