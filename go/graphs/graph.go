package graphs

// Edge represents and edge in a graph, containing its weight and destination node
type Edge struct {
	To     int
	Weight int
}

// AdjecencyList is a type alias for a 2D array of Edge structs
type AdjecencyList = [][]Edge

// AdjecencyMatrix is a type alias for a 2D array of integers
type AdjecencyMatrix = [][]int
