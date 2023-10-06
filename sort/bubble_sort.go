package sort

import . "golang.org/x/exp/constraints"

// BubbleSort sorts a slice of T in place using the bubble sort algorithm
// The ascending parameter indicates whether the slice should be sorted in ascending or descending order
func BubbleSort[T Ordered](slice []T, ascending bool) {
	if ascending {
		for i := len(slice); i > 0; i-- {
			for j := 1; j < i; j++ {
				if slice[j-1] > slice[j] {
					slice[j-1], slice[j] = slice[j], slice[j-1]
				}
			}
		}
	} else {
		for i := len(slice); i > 0; i-- {
			for j := 1; j < i; j++ {
				if slice[j-1] < slice[j] {
					slice[j-1], slice[j] = slice[j], slice[j-1]
				}
			}
		}
	}
}
