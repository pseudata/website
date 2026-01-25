from pseudata import Generator

gen0 = Generator(42, 0)
gen1 = Generator(42, 1)

print(gen0.next_int())
print(gen1.next_int())
