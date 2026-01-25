# Primitives Basic Example

This example demonstrates using the Primitives interface directly to generate individual values.

Primitives are the fundamental building blocks for data generation in pseudata. They are primarily used in two ways:
1. Inside model generators (like User, Address) via @generator decorators
2. Directly for generating standalone values (shown in this example)

The Primitives interface provides bunch of methods for generating specific types of data (emails, names, dates, numbers, etc.) without requiring a VirtualArray.

**Expected Output**

```
<pseudoid>
<email>
<given_name>
<family_name>
<city>
```

Each line demonstrates a different primitive method:
- `<pseudoid>`: UUID v8 encoding `worldSeed`, `typeSeq`, `index`
- `<email>`: Generated email address
- `<given_name>`: Gender-appropriate given name
- `<family_name>`: Family name (surname)
- `<city>`: City name from locale resources

All values are deterministic based on the parameters (`worldSeed`, `typeSeq`, `index`).
