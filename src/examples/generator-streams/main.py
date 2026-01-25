"""
This example demonstrates the stream parameter (second argument to Generator).
Different streams from the same seed produce independent sequences. This is useful
for parallel workflows where you need multiple reproducible random sequences.

All language implementations produce identical output.
"""

from pseudata import Generator

# Same seed, different streams
gen0 = Generator(42, 0)
gen1 = Generator(42, 1)

print(gen0.next_int())
print(gen1.next_int())
