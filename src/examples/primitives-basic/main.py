#!/usr/bin/env python3
"""
Demonstrates using the Primitives interface directly to generate individual values.

Primitives are the fundamental building blocks for data generation in pseudata.
They are primarily used in two ways:
1. Inside model generators (like User, Address) via @generator decorators
2. Directly for generating standalone values (shown in this example)

The Primitives interface provides ~75 methods for generating specific types of data
(emails, names, dates, numbers, etc.) without requiring a VirtualArray.

All language implementations produce identical output.
"""

from pseudata import new_primitives

# Create Primitives directly with world_seed=42, type_seq=100, index=0
prim = new_primitives(42, 100, 0)

# Generate individual values using primitive methods
print(prim.id())
print(prim.email())
print(prim.gendered_given_name())
print(prim.family_name())
print(prim.city())
