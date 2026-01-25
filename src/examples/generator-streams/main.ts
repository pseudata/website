import { Generator } from "@pseudata/core";

const gen0 = new Generator(42, 0);
const gen1 = new Generator(42, 1);

console.log(gen0.nextInt());
console.log(gen1.nextInt());
