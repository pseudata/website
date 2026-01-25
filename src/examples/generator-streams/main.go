package main

import "github.com/pseudata/pseudata"

func main() {
	gen0 := pseudata.NewGenerator(42, 0)
	gen1 := pseudata.NewGenerator(42, 1)

	println(gen0.NextInt())
	println(gen1.NextInt())
}
