package main

import (
	"fmt"

	"github.com/xduricai/dsa/list"
)

// TODO refactor into proper unit tests, too ugly atm
func runList() {
	ll := list.NewList[int]()
	var n int
	var err error

	ll.InsertAt(123, 0)
	fmt.Println(ll)

	ll.Prepend(456)

	fmt.Println(ll)
	ll.Append(789)

	fmt.Println(ll)

	err = ll.InsertAt(999, 3)

	fmt.Println(ll, err)

	n, err = ll.RemoveAt(3)

	fmt.Println(n, err)

	n, err = ll.RemoveAt(0)
	fmt.Println(n, err)

	n, err = ll.Pop()

	fmt.Println(n, err)

	n, err = ll.Remove()

	fmt.Println(n, err)

	ll.Prepend(123)
	ll.Pop()
	ll.Append(456)
	ll.Remove()
	fmt.Println(ll.Length())
}

func main() {
	fmt.Println("This does nothing for now c:")
	//runList()
}
