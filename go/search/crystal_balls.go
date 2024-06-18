package search

import "math"

// CrystalBallProblem solves the crystal ball problem for a slice of bool values
// The problem states that the participant is handed 2 crystal balls and their goal is to find the minimum height required for the balls to break
// The breaks parameter contains bool values indicating weather a ball breaks when dropped from a height corresponding to a given index of the array
// This function assumes that the input slice is correct i.e. it contains one or more false values followed by one or more true values
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
