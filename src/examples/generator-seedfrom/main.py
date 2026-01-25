from pseudata import Generator

seed = Generator.seed_from("Hello, World!")
gen = Generator(seed, 0)

print(gen.next_int())
