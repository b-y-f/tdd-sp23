export class Block {
  #color;

  #width;

  #height;

  constructor(color) {
    this.#color = color;
    this.#width = 1;
    this.#height = 1;
  }

  getColor() {
    return this.#color;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }
}
