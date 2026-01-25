package main

import "github.com/pseudata/pseudata"

func main() {
	comp, err := pseudata.DecodeID("00000000-0000-8002-a800-640000000001")
	if err != nil {
		panic(err)
	}

	println(comp.WorldSeed, comp.TypeSeq, comp.Index)
}
