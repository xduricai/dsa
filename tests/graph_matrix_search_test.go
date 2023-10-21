package tests

import (
	"testing"

	"github.com/xduricai/dsa/graphs"
)

func TestGraphMatrixSearch(t *testing.T) {
	matrix := graphs.AdjecencyMatrix{
		{0, 3, 1, 0, 0, 0, 0},
		{0, 0, 0, 0, 1, 0, 0},
		{0, 0, 7, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 0},
		{0, 1, 0, 5, 0, 2, 0},
		{0, 0, 18, 0, 0, 0, 1},
		{0, 0, 0, 1, 0, 0, 1},
	}
	expected := []int{0, 1, 4, 5, 6}
	pathBfs := graphs.MatrixBFS(&matrix, 0, 6)
	pathDfs := graphs.MatrixDFS(&matrix, 0, 6)

	if len(pathBfs) != len(expected) {
		t.Errorf("Graph matrix BFS failed, path is of incorrect length")
	}
	for idx := range pathBfs {
		if pathBfs[idx] != expected[idx] {
			t.Errorf("Graph matrix BFS failed, path has incorrect steps")
		}
	}

	if len(pathDfs) != len(expected) {
		t.Errorf("Graph matrix DFS failed, path is of incorrect length")
	}
	for idx := range pathDfs {
		if pathDfs[idx] != expected[idx] {
			t.Errorf("Graph matrix DFS failed, path has incorrect steps")
		}
	}

	pathBfs = graphs.MatrixBFS(&matrix, 7, 6)
	pathDfs = graphs.MatrixDFS(&matrix, 7, 6)
	if len(pathBfs) != 0 || len(pathDfs) != 0 {
		t.Errorf("Graph matrix failed for node not in graph")
	}

	matrix[5][6] = 0
	pathBfs = graphs.MatrixBFS(&matrix, 0, 6)
	pathDfs = graphs.MatrixDFS(&matrix, 0, 6)
	if len(pathBfs) != 0 {
		t.Errorf("Graph matrix BFS failed, returned path when none exists")
	}
	if len(pathDfs) != 0 {
		t.Errorf("Graph matrix DFS failed, returned path when none exists")
	}
}
