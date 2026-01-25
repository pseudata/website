from pseudata import Generator

gen1 = Generator(42, 0)
gen2 = Generator(42, 0)

gen1.advance(10_000_000)

for _ in range(10_000_000):
    gen2.next_int()

result1 = gen1.next_int()
result2 = gen2.next_int()

if result1 != result2:
    raise Exception(f"Results don't match! Advance={result1}, Loop={result2}")

print(result1)
