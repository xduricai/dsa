package main

import (
	"fmt"

	"github.com/xduricai/dsa/search"
	"github.com/xduricai/dsa/sort"
)

func runSearch() {
	unsorted := []int{0, 9, 1, 8, 2, 7, 3, 6, 4, 5}
	sorted := []int{}
	heights := []bool{false, false, false, false, false, false, false, true, true, true}

	for i := 0; i < 1000; i += 2 {
		sorted = append(sorted, i)
	}

	resLinear := search.LinearSearch(unsorted, 7)
	resBinary := search.BinarySearch(sorted, 264)
	resCrystalBalls := search.CrystalBallProblem(heights)

	fmt.Println("Linear search index: ", resLinear)
	fmt.Println("Binary search index: ", resBinary)
	fmt.Println("Crystal ball break height: ", resCrystalBalls)
}

func runSort() {
	unsorted := []int{0, 9, 1, 8, 2, 7, 3, 6, 4, 5}
	sort.BubbleSort(unsorted, true)
	fmt.Println("Slice sorted in ascending order: ", unsorted)
	sort.BubbleSort(unsorted, false)
	fmt.Println("Slice sorted in descending order: ", unsorted)
}

func main() {
	//runSearch()
	runSort()
}
