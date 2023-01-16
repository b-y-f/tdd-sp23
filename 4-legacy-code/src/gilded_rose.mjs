export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.#updateItem(item);
    }

    return this.items;
  }

  #updateItem(item) {
    switch (item.name) {
      case "Aged Brie":
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
        break;
      case "Sulfuras, Hand of Ragnaros":
        break;
      default:
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          if (item.quality > 0) {
            item.quality = item.quality - 1;
          }
        }
        break;
    }
  }
}
