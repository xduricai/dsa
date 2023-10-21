package tests

import (
	"testing"

	"github.com/xduricai/dsa/graphs"
)

func TestListGraphSearch(t *testing.T) {
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

	expected0 := []int{0, 2, 3, 6}
	expected1 := []int{0, 1, 2, 3, 4, 5, 6}
	expected2 := []int{0, 1, 4, 5, 6}
	pathBfs1 := graphs.ListBFS(&list1, 0, 6)
	pathDfs1 := graphs.ListDFS(&list1, 0, 6)
	pathBfs2 := graphs.ListBFS(&list2, 0, 6)
	pathDfs2 := graphs.ListDFS(&list2, 0, 6)

	if len(pathBfs1) != len(expected0) {
		t.Log(pathBfs1)
		t.Errorf("Graph list BFS 1 failed, path is of incorrect length")
	}
	if len(pathBfs2) != len(expected2) {
		t.Errorf("Graph list BFS 2 failed, path is of incorrect length")
	}

	for idx := range pathBfs1 {
		if pathBfs1[idx] != expected0[idx] {
			t.Errorf("Graph list BFS 1 failed, path has incorrect steps")
		}
	}
	for idx := range pathBfs2 {
		if pathBfs2[idx] != expected2[idx] {
			t.Errorf("Graph list BFS 2 failed, path has incorrect steps")
		}
	}

	if len(pathDfs1) != len(expected1) {
		t.Errorf("Graph list DFS 1 failed, path is of incorrect length")
	}
	if len(pathDfs2) != len(expected2) {
		t.Errorf("Graph list DFS 2 failed, path is of incorrect length")
	}

	for idx := range pathDfs1 {
		if pathDfs1[idx] != expected1[idx] {
			t.Errorf("Graph list DFS 1 failed, path has incorrect steps")
		}
	}
	for idx := range pathDfs2 {
		if pathDfs2[idx] != expected2[idx] {
			t.Errorf("Graph list DFS 2 failed, path has incorrect steps")
		}
	}

	pathBfs2 = graphs.ListBFS(&list2, 7, 6)
	pathDfs2 = graphs.ListDFS(&list2, 7, 6)
	if len(pathBfs2) != 0 || len(pathDfs2) != 0 {
		t.Errorf("Graph list failed for node not in graph")
	}

	list1[3] = []graphs.Edge{list1[3][0], list1[3][1]}
	list1[5] = []graphs.Edge{list1[5][1], list1[5][2]}
	pathBfs1 = graphs.ListBFS(&list1, 0, 6)
	pathDfs1 = graphs.ListDFS(&list1, 0, 6)

	if len(pathBfs1) != 0 {
		t.Errorf("Graph list BFS 1 failed, returned path when none exists")
	}
	if len(pathDfs1) != 0 {
		t.Errorf("Graph list DFS 1 failed, returned path when none exists")
	}

	list2[5] = []graphs.Edge{list2[5][0]}
	pathBfs2 = graphs.ListBFS(&list2, 0, 6)
	pathDfs2 = graphs.ListDFS(&list2, 0, 6)

	if len(pathBfs2) != 0 {
		t.Errorf("Graph list BFS 2 failed, returned path when none exists")
	}
	if len(pathDfs2) != 0 {
		t.Errorf("Graph list DFS 2 failed, returned path when none exists")
	}
}
