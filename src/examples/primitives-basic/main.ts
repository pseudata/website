import { newPrimitives } from "@pseudata/core";

const prim = newPrimitives(42, 100, 0);

console.log(prim.id());
console.log(prim.email());
console.log(prim.genderedGivenName());
console.log(prim.familyName());
console.log(prim.city());
