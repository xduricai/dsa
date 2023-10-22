package graphs

import "math"

const Infinity = math.MaxInt32

func getLowestUnvisited(seen *[]bool, distances *[]int) int {
	idx := -1
	lowest := Infinity

	for i := range *seen {
		if (*seen)[i] {
			continue
		}

		if (*distances)[i] < lowest {
			idx = i
			lowest = (*distances)[i]
		}
	}
	return idx
}

func Djikstra(graph *AdjecencyList, source int, target int) []int {
	seen := make([]bool, len(*graph))
	previous := make([]int, len(*graph))
	for idx := range previous {
		previous[idx] = -1
	}
	distances := make([]int, len(*graph))
	for idx := range distances {
		distances[idx] = Infinity
	}
	distances[source] = 0

	current := getLowestUnvisited(&seen, &distances)
	for current != -1 {
		seen[current] = true
		adjecent := (*graph)[current]

		for _, edge := range adjecent {
			if seen[edge.To] {
				continue
			}
			distance := distances[current] + edge.Weight
			if distance < distances[edge.To] {
				distances[edge.To] = distance
				previous[edge.To] = current
			}
		}

		current = getLowestUnvisited(&seen, &distances)
	}

	path := []int{}
	current = target

	for current != -1 {
		path = append([]int{current}, path...)
		current = previous[current]
	}
	return path
}

// func DjikstraHeap(graph *AdjecencyList, source int, target int) []int {
// 	previous := make([]int, len(*graph))
// 	for idx := range previous {
// 		previous[idx] = -1
// 	}

// 	path := []int{}
// 	current := target

// 	for current != -1 {
// 		path = append([]int{current}, path...)
// 		current = previous[current]
// 	}
// 	return path
// }
