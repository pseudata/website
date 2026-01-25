"""
This example demonstrates the seed_from() function, which converts a string
into a numeric seed. This is useful for creating reproducible random sequences
from easy-to-remember strings instead of arbitrary numbers.

All language implementations produce identical output.
"""

from pseudata import Generator

seed = Generator.seed_from("Hello, World!")
gen = Generator(seed, 0)

print(gen.next_int())
