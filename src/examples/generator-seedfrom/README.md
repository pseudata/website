# Generator SeedFrom Example

This example demonstrates the `SeedFrom()` method, which converts a memorable string into a deterministic seed. This allows using human-readable strings like "Hello, World!" or "production-2024" instead of numeric seeds.

**Expected Output**

```
<random_integer>
```

The `<random_integer>` is the first random number generated from the seed derived from `"Hello, World!"`. The same string always produces the same output, enabling reproducible data generation with memorable identifiers.
