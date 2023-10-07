package search

import . "golang.org/x/exp/constraints"

// BinarySearch returns the index of a target integer inside of a slice or -1 if the integer is not present
// The input slice must be sorted
func BinarySearch[T Ordered](slice []T, target T) int {
	low := 0
	high := len(slice)

	for low < high {
		mid := low + (high-low)/2
		value := slice[mid]

		if target == value {
			return mid
		}

		if target < value {
			high = mid
		} else {
			low = mid + 1
		}
	}

	return -1
}
