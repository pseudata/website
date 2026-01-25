package main

import "github.com/pseudata/pseudata"

func main() {
	seed := pseudata.SeedFrom("Hello, World!")
	gen := pseudata.NewGenerator(seed, 0)

	println(gen.NextInt())
}
