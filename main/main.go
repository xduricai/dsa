package main

import (
	"fmt"

	"github.com/xduricai/dsa/search"
)

func runSearch() {
	unsorted := []int{0, 9, 1, 8, 2, 7, 3, 6, 4, 5}
	sorted := []int{}

	for i := 0; i < 1000; i += 2 {
		sorted = append(sorted, i)
	}

	resLinear := search.LinearSearch(unsorted, 7)
	resBinary := search.BinarySearch(sorted, 264)

	fmt.Println(resLinear)
	fmt.Println(resBinary)
}

func main() {
	runSearch()
}
