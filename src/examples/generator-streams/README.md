# Generator Streams Example

This example demonstrates the second parameter (stream) in the Generator constructor. The stream parameter enables multiple independent random sequences with the same seed, which is critical for generating different types of data (Users, Addresses, Products) without interference.

All language implementations produce identical output.

**Expected Output**

```
<value_stream_0>
<value_stream_1>
```

Both generators use same seed, but different stream values produce independent sequences. The `<value_stream_0>` and `<value_stream_1>` will be different, demonstrating stream independence.
