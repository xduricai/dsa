package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/heap"
)

func TestHeap(t *testing.T) {
	values := []int{1, 3, 4, 5, 7, 8, 70, 100}
	heap := heap.NewMinHeap[int]()

	heap.Insert(5)
	heap.Insert(3)
	heap.Insert(70)
	heap.Insert(100)
	heap.Insert(4)
	heap.Insert(1)
	heap.Insert(8)
	heap.Insert(7)

	if heap.Length() != 8 {
		t.Errorf("Heap failed, incorrect length")
	}

	for _, value := range values {
		res, err := heap.Delete()
		if res != value || err != nil {
			t.Errorf("Heap failed, incorrect order of elements")
		}
	}

	if heap.Length() != 0 {
		t.Errorf("Heap failed, incorrect length")
	}
}
