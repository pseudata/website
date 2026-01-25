# Generator Advance Example

This example demonstrates the `Advance()` method, which skips ahead N steps in the random sequence. It's equivalent to calling `NextInt()` N times, but much more efficient for large N.

**Expected Output**

```
Result after <iterations> iterations: <result_value>
```

The `<result_value>` is the random number at position `<iterations>` in the sequence. The example validates that manual iteration and `advance()` produce identical results.
