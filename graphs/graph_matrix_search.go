package graphs

import "github.com/xduricai/dsa/lists"

// AdjecencyMatrix is a type alias for a 2D array of integers
type AdjecencyMatrix = [][]int

// walk checks whether a vertex of a graph is our destination and subsequently walks to its neighbours
func walk(graph *AdjecencyMatrix, current int, target int, seen *[]bool, path *[]int) bool {
	if (*seen)[current] {
		return false
	}
	if current == target {
		*path = append((*path), target)
		return true
	}

	(*seen)[current] = true
	*path = append((*path), current)
	adjecent := (*graph)[current]

	for i := 0; i < len(adjecent); i++ {
		if adjecent[i] == 0 {
			continue
		}
		foundTarget := walk(graph, i, target, seen, path)

		if foundTarget {
			return true
		}
	}
	*path = (*path)[:len(*path)-1]

	return false
}

// DFS uses depth-first search to find the path from a source node to a target node in a graph, returns a slice with the order of nodes or an empty slice if no path exists
func DFS(graph *AdjecencyMatrix, source int, target int) []int {
	path := []int{}
	seen := make([]bool, len(*graph))
	queue := lists.NewQueue[int]()
	queue.Enqueue(source)

	pathExists := walk(graph, source, target, &seen, &path)
	if pathExists {
		return path
	}
	return []int{}
}

// BFS uses breadth-first search to find the path from a source node to a target node in a graph, returns a slice with the order of nodes or an empty slice if no path exists
func BFS(graph *AdjecencyMatrix, source int, target int) []int {
	seen := make([]bool, len(*graph))
	previous := make([]int, len(*graph))
	for idx := range previous {
		previous[idx] = -1
	}

	queue := lists.NewQueue[int]()
	queue.Enqueue(source)
	seen[source] = true

	for queue.Length() > 0 {
		current, _ := queue.Dequeue()

		if current == target {
			break
		}
		adjecent := (*graph)[current]

		for i := 0; i < len(adjecent); i++ {
			if adjecent[i] == 0 || seen[i] {
				continue
			}

			seen[i] = true
			previous[i] = current
			queue.Enqueue(i)
		}
	}

	if previous[target] == -1 {
		return []int{}
	}

	current := target
	path := []int{}

	for current != -1 {
		path = append([]int{current}, path...)
		current = previous[current]
	}

	return path
}
