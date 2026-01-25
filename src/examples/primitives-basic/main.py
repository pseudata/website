from pseudata import new_primitives

prim = new_primitives(42, 100, 0)

print(prim.id())
print(prim.email())
print(prim.gendered_given_name())
print(prim.family_name())
print(prim.city())
