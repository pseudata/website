import { Generator } from "@pseudata/core";

const gen1 = new Generator(42, 0);
const gen2 = new Generator(42, 0);

gen1.advance(10_000_000);

for (let i = 0; i < 10_000_000; i++) {
  gen2.nextInt();
}

const result1 = gen1.nextInt();
const result2 = gen2.nextInt();

if (result1 !== result2) {
  throw new Error(`Results don't match! Advance=${result1}, Loop=${result2}`);
}

console.log(result1);
