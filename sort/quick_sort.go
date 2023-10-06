package sort

import . "golang.org/x/exp/constraints"

// qs is the recursive quicksort driver function that runs until the slice is sorted
func qs[T Ordered](slice []T, low int, high int, ascending bool) {
	if low >= high {
		return
	}

	pivotIdx := partition[T](slice, low, high, ascending)
	qs[T](slice, low, pivotIdx-1, ascending)
	qs[T](slice, pivotIdx+1, high, ascending)
}

// partition determines the index of the pivot while also sorting the slice in the process
func partition[T Ordered](slice []T, low int, high int, ascending bool) int {
	pivot := slice[high]
	idx := low - 1

	for i := low; i < high; i++ {
		if ascending && slice[i] <= pivot || !ascending && slice[i] >= pivot {
			idx++
			slice[i], slice[idx] = slice[idx], slice[i]
		}
	}

	idx++
	slice[high], slice[idx] = slice[idx], slice[high]

	return idx
}

// QuickSort sorts a slice of T in place using the quick sort algorithm
// The ascending parameter indicates whether the slice should be sorted in ascending or descending order
func QuickSort[T Ordered](slice []T, ascending bool) {
	qs[T](slice, 0, len(slice)-1, ascending)
}
