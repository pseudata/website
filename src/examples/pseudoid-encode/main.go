package main

import "github.com/pseudata/pseudata"

func main() {
	id := pseudata.EncodeID(42, 100, 1)

	println(id)
}
