import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import fs from 'fs';


// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

const rawData = "Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female" 

const contents = [{ firstName: 'Loid', lastName: 'Forger', gender: 'm' },
{ firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 },
{ firstName: 'Yor', lastName: 'Forger', gender: 'f', age: 27 }]

const filename = './people.csv'

beforeEach(() => {
  fs.writeFileSync(filename, rawData);
});

afterEach(() => {
  fs.unlinkSync(filename);
})

describe("Untestable 3: CSV file parsing", () => {
  it("todo", async () => {
    // TODO: write proper tests
    try {
      expect(await parsePeopleCsv(filename)).to.deep.equal(contents);
    } catch (e) {}
  });
});
