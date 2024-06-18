package tests

import (
	"testing"

	"github.com/xduricai/dsa/go/sort"
)

func TestQuickSortAscending(t *testing.T) {
	sorted := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 444, 1234}
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}
	sort.QuickSort(slice, true)

	for i := range slice {
		if sorted[i] != slice[i] {
			t.Error()
		}
	}
}

func TestQuickSortDescending(t *testing.T) {
	sorted := []int{1234, 444, 100, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0}
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}
	sort.QuickSort(slice, false)

	for i := range slice {
		if sorted[i] != slice[i] {
			t.Error()
		}
	}
}

func TestQuickSortIterAscending(t *testing.T) {
	sorted := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 444, 1234}
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}
	sort.QuickSortIterative(slice, true)

	for i := range slice {
		if sorted[i] != slice[i] {
			t.Error()
		}
	}
}

func TestQuickSortIterDescending(t *testing.T) {
	sorted := []int{1234, 444, 100, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0}
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}
	sort.QuickSortIterative(slice, false)

	for i := range slice {
		if sorted[i] != slice[i] {
			t.Error()
		}
	}
}
