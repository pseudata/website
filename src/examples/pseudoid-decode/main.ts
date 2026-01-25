import { decodeId } from "@pseudata/core";

const comp = decodeId("00000000-0000-8002-a800-640000000001");

console.log(comp.worldSeed, comp.typeSeq, comp.index);
