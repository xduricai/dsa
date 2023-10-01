package sort

import "testing"

var ascending = []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 444, 1234}
var descending = []int{1234, 444, 100, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0}

func TestAscending(t *testing.T) {
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}
	BubbleSort(slice, true)

	for i := range slice {
		if ascending[i] != slice[i] {
			t.Error()
		}
	}
}

func TestDescending(t *testing.T) {
	slice := []int{0, 9, 1, 100, 8, 2, 7, 3, 1234, 6, 4, 5, 444}
	BubbleSort(slice, false)

	for i := range slice {
		if descending[i] != slice[i] {
			t.Error()
		}
	}
}
