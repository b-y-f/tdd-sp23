import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

/**
 * After some simple math, we can calculate the expected outcome
 * or probability to test the dice rolling result without using
 * presudo seed.
 * 
 * There are two outcomes, first one if `pair`: result would be 
 * around 101-106, and second one the result would be around 
 * 2-6 and the probability of getting `pair` is 6/36
 */
describe("Untestable 2: a dice game", () => {
  it("Is in correct range?", ()=>{
    const score = diceHandValue() 
    expect(score).to.satisfy((score)=>{
      if ((score >= 101 && score < 107) || (score >=2 && score < 7) ){
        return true
      }else{
        return false
      }
    })
  })

  it("test fair result", () => {
    const N = 1000000
    let outcomes = {'pair':0, 'notPair':0}
    for (let i = 0; i < N; i++) {
      const score = diceHandValue()
      if (score> 100){
        outcomes.pair +=1;
      }else{
        outcomes.notPair+=1;
      }
    }

    const prob = (outcomes.pair/N);

    expect(prob).to.be.closeTo(6/36, 0.001);
  });
});
