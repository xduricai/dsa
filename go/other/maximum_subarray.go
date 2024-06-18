package other

import "math"

// MaximumSubarray returns the highest possible sum of a contiguous subarray within a given array of integers using Kadane's algorithm
func MaximumSubarray(slice *[]int) int {
	currentMax := 0
	bestMax := math.MinInt32

	for _, value := range *slice {
		currentMax = max(value, currentMax+value)
		bestMax = max(currentMax, bestMax)
	}

	return bestMax
}
