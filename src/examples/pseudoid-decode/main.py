"""
This example demonstrates decoding a PseudoID (UUID v8) back into its original
worldSeed, typeSeq, and index components. This allows tracing any generated
value back to its exact position in the deterministic sequence.

All language implementations produce identical output.
"""

from pseudata import decode_id

comp = decode_id("00000000-0000-8002-a800-640000000001")

print(comp.world_seed, comp.type_seq, comp.index)
