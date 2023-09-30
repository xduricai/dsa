package main

import (
	"fmt"

	"github.com/xduricai/dsa/list"
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

func runQueue() {
	q := list.NewQueue[int]()

	val, err := q.Deque()
	fmt.Println(val, err)

	val, err = q.Peek()
	fmt.Println(err)

	q.Enqueue(123)
	fmt.Println(q)
	val, err = q.Peek()
	fmt.Println(val)

	q.Deque()
	fmt.Println(q)

	q.Enqueue(45)
	q.Enqueue(67)
	q.Enqueue(89)
	fmt.Println(q)
	val, err = q.Peek()
	fmt.Println(val)
	val, err = q.Deque()
	fmt.Println(val)
	fmt.Println(q)
}

func runStack() {
	s := list.NewStack[int]()

	val, err := s.Pop()
	fmt.Println(val, err)

	val, err = s.Peek()
	fmt.Println(err)

	s.Push(123)
	fmt.Println(s)
	val, err = s.Peek()
	fmt.Println(val)

	s.Pop()
	fmt.Println(s)

	s.Push(45)
	s.Push(67)
	s.Push(89)
	fmt.Println(s)
	val, err = s.Peek()
	fmt.Println(val)
	val, err = s.Pop()
	fmt.Println(val)
	fmt.Println(s)
	s.Push(11)
	s.Push(22)
	s.Push(33)
	s.Pop()
	fmt.Println(s)
}

func main() {
	//runSearch()
	//runSort()
	//runList()
	//runQueue()
	runStack()
}
