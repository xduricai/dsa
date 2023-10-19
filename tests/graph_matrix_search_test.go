package tests

import (
	"testing"

	"github.com/xduricai/dsa/graphs"
)

func TestGraphMatrixBfs(t *testing.T) {
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
	path := graphs.Bfs(matrix, 0, 6)

	if len(path) != len(expected) {
		t.Log(path)
		t.Errorf("Graph matrix BFS failed, path is of incorrect length")
	}
	for idx := range path {
		if path[idx] != expected[idx] {
			t.Errorf("Graph matrix BFS failed, path has incorrect steps")
		}
	}

	matrix[5][6] = 0
	path = graphs.Bfs(matrix, 0, 6)
	if len(path) != 0 {
		t.Errorf("Graph matrix BFS failed, returned path when none exists")
	}
}
