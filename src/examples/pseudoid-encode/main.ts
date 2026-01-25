import { encodeId } from "@pseudata/core";

const id = encodeId(42n, 100, 1n);

console.log(id);
