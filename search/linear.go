package search

func LinearSearch(slice []int, target int) int {
	for index, element := range slice {
		if element == target {
			return index
		}
	}
	return -1
}