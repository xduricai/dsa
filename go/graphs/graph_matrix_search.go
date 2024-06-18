package graphs

import "github.com/xduricai/dsa/go/lists"

// walkMatrix checks whether a vertex of a graph is our destination and subsequently walks to its neighbours
func walkMatrix(graph *AdjecencyMatrix, current int, target int, seen *[]bool, path *[]int) bool {
	if (*seen)[current] {
		return false
	}

	(*seen)[current] = true
	*path = append((*path), current)

	if current == target {
		return true
	}
	adjecent := (*graph)[current]

	for i := range adjecent {
		if adjecent[i] == 0 {
			continue
		}
		if walkMatrix(graph, i, target, seen, path) {
			return true
		}
	}

	*path = (*path)[:len(*path)-1]
	return false
}

// MatrixDFS uses depth-first search to find the path from a source node to a target node in a graph, returns a slice with the order of nodes or an empty slice if no path exists
func MatrixDFS(graph *AdjecencyMatrix, source int, target int) []int {
	if target >= len(*graph) || source >= len(*graph) {
		return []int{}
	}
	path := []int{}
	seen := make([]bool, len(*graph))
	walkMatrix(graph, source, target, &seen, &path)

	return path
}

// MatrixBFS uses breadth-first search to find the path from a source node to a target node in a graph, returns a slice with the order of nodes or an empty slice if no path exists
func MatrixBFS(graph *AdjecencyMatrix, source int, target int) []int {
	if target >= len(*graph) || source >= len(*graph) {
		return []int{}
	}
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

	path := []int{}
	current := target

	for current != -1 {
		path = append([]int{current}, path...)
		current = previous[current]
	}

	return path
}
