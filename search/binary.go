package search

func BinarySearch(slice []int, target int) int {
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
