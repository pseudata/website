package main

import (
	"fmt"

	"github.com/pseudata/pseudata"
)

func main() {
	gen1 := pseudata.NewGenerator(42, 0)
	gen2 := pseudata.NewGenerator(42, 0)

	gen1.Advance(10_000_000)

	for range 10_000_000 {
		gen2.NextInt()
	}

	result1 := gen1.NextInt()
	result2 := gen2.NextInt()

	if result1 != result2 {
		panic(fmt.Sprintf("Results don't match! Advance=%d, Loop=%d", result1, result2))
	}

	println(result1)
}
