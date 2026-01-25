import { Generator } from "@pseudata/core";

const seed = Generator.seedFrom("Hello, World!");
const gen = new Generator(seed, 0);

console.log(gen.nextInt());
