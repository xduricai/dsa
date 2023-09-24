package search

// LinearSearch returns the index of a target integer inside of a slice or -1 if the integer is not present
func LinearSearch(slice []int, target int) int {
	for index, element := range slice {
		if element == target {
			return index
		}
	}
	return -1
}
