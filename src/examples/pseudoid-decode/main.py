from pseudata import decode_id

comp = decode_id("00000000-0000-8002-a800-640000000001")

print(comp.world_seed, comp.type_seq, comp.index)
