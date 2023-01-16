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

  updateItem() {
    if (this.posQuality()) {
      this.decQuality();
    }
    this.decSellIn();
    if (this.negSellIn()) {
      if (this.posQuality()) {
        this.decQuality();
      }
    }
  }

  posQuality() {
    return this.quality > 0;
  }

  negSellIn() {
    return this.sellIn < 0;
  }

  resetQuality() {
    this.quality = 0;
  }

  incQuality() {
    this.quality = this.quality + 1;
  }

  decQuality() {
    this.quality = this.quality - 1;
  }

  decSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  updateQualityLowerThanFifty() {
    if (this.quality < 50) {
      this.incQuality();
    }
  }
}

export class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateItem() {
    this.updateQualityLowerThanFifty();
    this.decSellIn();
    if (this.negSellIn()) {
      this.updateQualityLowerThanFifty();
    }
  }
}

export class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }
  updateItem() {
    if (this.quality < 50) {
      this.incQuality();
      if (this.sellIn < 11) {
        this.updateQualityLowerThanFifty();
      }
      if (this.sellIn < 6) {
        this.updateQualityLowerThanFifty();
      }
    }
    this.decSellIn();
    if (this.negSellIn()) {
      this.resetQuality();
    }
  }
}

export class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }
  updateItem() {}
}
