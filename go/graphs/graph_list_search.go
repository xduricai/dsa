package graphs

import "github.com/xduricai/dsa/go/lists"

// walkList checks whether a vertex of a graph is our destination and subsequently walks to its neighbours
func walkList(graph *AdjecencyList, current int, target int, seen *[]bool, path *[]int) bool {
	if (*seen)[current] {
		return false
	}

	(*seen)[current] = true
	*path = append(*path, current)

	if current == target {
		return true
	}
	adjecent := (*graph)[current]

	for _, edge := range adjecent {
		if walkList(graph, edge.To, target, seen, path) {
			return true
		}
	}

	*path = (*path)[:len(*path)-1]
	return false
}

// ListDFS uses depth-first search to find the path from a source node to a target node in a graph, returns a slice with the order of nodes or an empty slice if no path exists
func ListDFS(graph *AdjecencyList, source int, target int) []int {
	if target >= len(*graph) || source >= len(*graph) {
		return []int{}
	}
	seen := make([]bool, len(*graph))
	path := []int{}
	walkList(graph, source, target, &seen, &path)

	return path
}

// ListBFS uses breadth-first search to find the path from a source node to a target node in a graph, returns a slice with the order of nodes or an empty slice if no path exists
func ListBFS(graph *AdjecencyList, source int, target int) []int {
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

		for _, edge := range adjecent {
			if seen[edge.To] {
				continue
			}

			seen[edge.To] = true
			previous[edge.To] = current
			queue.Enqueue(edge.To)
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
