package graphs

import (
	"math"

	"github.com/xduricai/dsa/heap"
)

const infinity = math.MaxInt32

type path struct {
	vertex   int
	distance int
}

func (p *path) Key() int {
	return p.vertex
}

func (p *path) Value() int {
	return p.distance
}

func (p *path) SetValue(value int) {
	p.distance = value
}

func newPath(vertex int, distance int) *path {
	return &path{
		vertex:   vertex,
		distance: distance,
	}
}

// getLowestUnvisited returns the number of the graph vertex with the shortest distance from the source
func getLowestUnvisited(seen *[]bool, distances *[]int) int {
	idx := -1
	lowest := infinity

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

// Dijkstra finds the shortest path in an adjecency list of a weighted graph using Dijkstra's shortest path algorithm
func Dijkstra(graph *AdjecencyList, source int, target int) []int {
	seen := make([]bool, len(*graph))
	previous := make([]int, len(*graph))
	for idx := range previous {
		previous[idx] = -1
	}
	distances := make([]int, len(*graph))
	for idx := range distances {
		distances[idx] = infinity
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
	return generatePath(&previous, target)
}

// DijkstraWithHeap finds the shortest path in an adjecency list of a weighted graph using Dijkstra's shortest path algorithm, using a MinHeap instead of an array to keep track of distances
func DijkstraWithHeap(graph *AdjecencyList, source int, target int) []int {
	previous := make([]int, len(*graph))
	for idx := range previous {
		previous[idx] = -1
	}

	heap := heap.NewIndexedMinHeap[int, int]()
	for i := 0; i < len(*graph); i++ {
		if i == source {
			heap.Insert(newPath(source, 0))
		} else {
			heap.Insert(newPath(i, infinity))
		}
	}

	for heap.Length() > 0 {
		current, _ := heap.Delete()
		idx := current.Key()
		distance := current.Value()
		adjecent := (*graph)[idx]

		for _, edge := range adjecent {
			node, err := heap.Get(edge.To)

			if err != nil {
				continue
			}
			newDistance := distance + edge.Weight

			if newDistance < node.Value() {
				heap.Update(edge.To, newDistance)
				previous[edge.To] = current.Key()
			}
		}
	}
	return generatePath(&previous, target)
}

// generatePath returns an array of integers representing a path through a graph
func generatePath(previous *[]int, target int) []int {
	path := []int{}
	current := target

	for current != -1 {
		path = append([]int{current}, path...)
		current = (*previous)[current]
	}
	return path
}
