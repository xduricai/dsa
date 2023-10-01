package search

// LinearSearch returns the index of a target integer inside of a slice or -1 if the integer is not present
func LinearSearch[T comparable](slice []T, target T) int {
	for index, element := range slice {
		if element == target {
			return index
		}
	}
	return -1
}
