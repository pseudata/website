"""
This example demonstrates that a Generator produces a sequence of values.
Each call to next_int() returns the next value in the deterministic sequence.

All language implementations produce identical output.
"""

from pseudata import Generator

gen = Generator(42, 0)

print(gen.next_int())
print(gen.next_int())
print(gen.next_int())
