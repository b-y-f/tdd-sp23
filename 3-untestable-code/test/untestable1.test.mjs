import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

const millisPerDay = 24 * 60 * 60 * 1000; 
describe("Untestable 1: days until Christmas", () => {
  const XMAS_DATE_23 = new Date(2023,11,25)
  it("Test if 0 day before xmax 2023", () => {
    expect(daysUntilChristmas(XMAS_DATE_23)).to.equal(0);
  });
  
  it("test 10 day before xmax 2023", ()=>{
    const mockDate = new Date(XMAS_DATE_23 - millisPerDay * 10);
    expect(daysUntilChristmas(mockDate)).to.equal(10);
  })

  it("Test if 20 day before xmax 2023", () => {
    const mockDate = new Date(XMAS_DATE_23 - millisPerDay * 20);
    expect(daysUntilChristmas(mockDate)).to.equal(20);
  });
});
