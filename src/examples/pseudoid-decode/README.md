# PseudoID Decode Example

This example demonstrates decoding a PseudoID (UUID v8) back into its original `worldSeed`, `typeSeq`, and `index` components. This allows tracing any generated value back to its exact position in the deterministic sequence.

**Expected Output**

```
<world_seed> <type_seq> <index>
```

These values match the parameters used to create the original PseudoID.
