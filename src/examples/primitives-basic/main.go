package main

import (
	"fmt"

	"github.com/pseudata/pseudata"
)

func main() {
	prim := pseudata.NewPrimitives(42, 100, 0, nil)

	fmt.Println(prim.ID())
	fmt.Println(prim.Email())
	fmt.Println(prim.GenderedGivenName())
	fmt.Println(prim.FamilyName())
	fmt.Println(prim.City())
}
