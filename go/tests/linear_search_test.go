package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/search"
)

func TestLinear(t *testing.T) {
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}

	for i := range slice {
		if search.LinearSearch[int](slice, slice[i]) != i {
			t.Errorf("Linear search failed, did not find element in slice")
		}
	}

	for _, number := range []int{999, -1, 123} {
		if search.LinearSearch[int](slice, number) != -1 {
			t.Errorf("Linear search failed, found element not in slice")
		}
	}
}
