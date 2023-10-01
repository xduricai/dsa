package tests

import (
	"testing"

	"github.com/xduricai/dsa/search"
)

func TestBinary(t *testing.T) {
	slice := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 444, 1234}

	for i := range slice {
		if search.BinarySearch[int](slice, slice[i]) != i {
			t.Errorf("Binary search failed, did not find element in slice")
		}
	}

	for _, number := range []int{999, -1, 123} {
		if search.BinarySearch[int](slice, number) != -1 {
			t.Errorf("Binary search failed, found element not in slice")
		}
	}
}
