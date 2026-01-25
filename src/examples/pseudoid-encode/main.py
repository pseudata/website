"""
This example demonstrates encoding worldSeed, typeSeq, and index values into
a deterministic, sortable UUID v8 PseudoID. The encoded ID preserves all three
values and can be decoded back to its original components.

All language implementations produce identical output.
"""

from pseudata import encode_id

id = encode_id(42, 100, 1)

print(id)
