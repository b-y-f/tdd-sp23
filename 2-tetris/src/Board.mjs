export class Board {
  width;

  height;

  falling = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(block) {
    this.falling = true;
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        if (i === 0 && j === 1 && this.hasFalling()) {
          s += "X";
        } else {
          s += ".";
        }
      }
      s += "\n";
    }
    return s;
  }
}
