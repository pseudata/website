package main

import "github.com/pseudata/pseudata"

func main() {
	gen := pseudata.NewGenerator(42, 0)

	println(gen.NextInt())
	println(gen.NextInt())
	println(gen.NextInt())
}
