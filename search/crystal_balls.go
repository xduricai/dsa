package search

import (
	"math"
)

func CrystalBallProblem(breaks []bool) int {
	root := int(math.Sqrt(float64(len(breaks))))
	var maxIndex int

	for maxIndex = root; maxIndex < len(breaks); maxIndex += root {
		if breaks[maxIndex] {
			break
		}
	}

	for index := maxIndex - root; index <= maxIndex && index < len(breaks); index++ {
		if breaks[index] {
			return index
		}
	}

	return -1
}
