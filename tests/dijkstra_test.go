package tests

import (
	"testing"

	"github.com/xduricai/dsa/graphs"
)

func TestDijkstra(t *testing.T) {
	list1 := graphs.AdjecencyList{
		[]graphs.Edge{
			{To: 1, Weight: 3},
			{To: 2, Weight: 1},
		},
		[]graphs.Edge{
			{To: 0, Weight: 3},
			{To: 2, Weight: 4},
			{To: 4, Weight: 1},
		},
		[]graphs.Edge{
			{To: 1, Weight: 4},
			{To: 3, Weight: 7},
			{To: 0, Weight: 1},
		},
		[]graphs.Edge{
			{To: 2, Weight: 7},
			{To: 4, Weight: 5},
			{To: 6, Weight: 1},
		},
		[]graphs.Edge{
			{To: 1, Weight: 1},
			{To: 3, Weight: 5},
			{To: 5, Weight: 2},
		},
		[]graphs.Edge{
			{To: 6, Weight: 1},
			{To: 4, Weight: 2},
			{To: 2, Weight: 18},
		},
		[]graphs.Edge{
			{To: 3, Weight: 1},
			{To: 5, Weight: 1},
		},
	}

	list2 := graphs.AdjecencyList{
		[]graphs.Edge{
			{To: 1, Weight: 3},
			{To: 2, Weight: 1},
		},
		[]graphs.Edge{
			{To: 4, Weight: 1},
		},
		[]graphs.Edge{
			{To: 3, Weight: 7},
		},
		[]graphs.Edge{},
		[]graphs.Edge{
			{To: 1, Weight: 1},
			{To: 3, Weight: 5},
			{To: 5, Weight: 2},
		},
		[]graphs.Edge{
			{To: 2, Weight: 18},
			{To: 6, Weight: 1},
		},
		[]graphs.Edge{
			{To: 3, Weight: 1},
		},
	}

	expected := []int{0, 1, 4, 5, 6}
	path1 := graphs.Dijkstra(&list1, 0, 6)
	path2 := graphs.Dijkstra(&list2, 0, 6)

	if len(path1) != len(expected) {
		t.Errorf("Dijkstra list 1 failed, path is of incorrect length")
	}
	if len(path2) != len(expected) {
		t.Errorf("Dijkstra list 2 failed, path is of incorrect length")
	}

	for idx := range expected {
		if path1[idx] != expected[idx] {
			t.Errorf("Dijkstra list 1 failed, path has incorrect steps")
		}
		if path2[idx] != expected[idx] {
			t.Errorf("Dijkstra list 2 failed, path has incorrect steps")
		}
	}
}

func TestDijkstraWithHeap(t *testing.T) {
	list1 := graphs.AdjecencyList{
		[]graphs.Edge{
			{To: 1, Weight: 3},
			{To: 2, Weight: 1},
		},
		[]graphs.Edge{
			{To: 0, Weight: 3},
			{To: 2, Weight: 4},
			{To: 4, Weight: 1},
		},
		[]graphs.Edge{
			{To: 1, Weight: 4},
			{To: 3, Weight: 7},
			{To: 0, Weight: 1},
		},
		[]graphs.Edge{
			{To: 2, Weight: 7},
			{To: 4, Weight: 5},
			{To: 6, Weight: 1},
		},
		[]graphs.Edge{
			{To: 1, Weight: 1},
			{To: 3, Weight: 5},
			{To: 5, Weight: 2},
		},
		[]graphs.Edge{
			{To: 6, Weight: 1},
			{To: 4, Weight: 2},
			{To: 2, Weight: 18},
		},
		[]graphs.Edge{
			{To: 3, Weight: 1},
			{To: 5, Weight: 1},
		},
	}

	list2 := graphs.AdjecencyList{
		[]graphs.Edge{
			{To: 1, Weight: 3},
			{To: 2, Weight: 1},
		},
		[]graphs.Edge{
			{To: 4, Weight: 1},
		},
		[]graphs.Edge{
			{To: 3, Weight: 7},
		},
		[]graphs.Edge{},
		[]graphs.Edge{
			{To: 1, Weight: 1},
			{To: 3, Weight: 5},
			{To: 5, Weight: 2},
		},
		[]graphs.Edge{
			{To: 2, Weight: 18},
			{To: 6, Weight: 1},
		},
		[]graphs.Edge{
			{To: 3, Weight: 1},
		},
	}

	expected := []int{0, 1, 4, 5, 6}
	path1 := graphs.DijkstraWithHeap(&list1, 0, 6)
	path2 := graphs.DijkstraWithHeap(&list2, 0, 6)

	if len(path1) != len(expected) {
		t.Errorf("Dijkstra using heap 1 failed, path is of incorrect length")
	}
	if len(path2) != len(expected) {
		t.Errorf("Dijkstra using heap 2 failed, path is of incorrect length")
	}

	for idx := range expected {
		if path1[idx] != expected[idx] {
			t.Errorf("Dijkstra using heap 1 failed, path has incorrect steps")
		}
		if path2[idx] != expected[idx] {
			t.Errorf("Dijkstra using heap 2 failed, path has incorrect steps")
		}
	}
}
