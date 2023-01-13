export class Board {
  width;

  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.height; i += 1) {
      for (let j = 0; j < this.width; j += 1) {
        s += ".";
      }
      s += "\n";
    }
    return s;
  }
}
