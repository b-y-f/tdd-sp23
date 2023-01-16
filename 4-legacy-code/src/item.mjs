export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  static createItem(name, sellIn, quality) {
    switch (name) {
      case "Aged Brie":
        return new AgedBrie(sellIn, quality);
      case "Backstage passes to a TAFKAL80ETC concert":
        return new BackstagePass(sellIn, quality);
      case "Sulfuras, Hand of Ragnaros":
        return new Sulfuras(sellIn, quality);
      default:
        return new Item(name, sellIn, quality);
    }
  }

  toString() {
    return `${this.name} | ${this.sellIn} | ${this.quality}`;
  }
}

export class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }
}

export class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }
}

export class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }
}
