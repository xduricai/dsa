package tests

import (
	"testing"

	"github.com/xduricai/dsa/other"
)

func TestIslands(t *testing.T) {
	graph := [][]int{
		{0, 1, 0, 0, 1},
		{0, 0, 0, 1, 1},
		{0, 0, 0, 0, 1},
		{0, 0, 1, 0, 0},
		{0, 1, 1, 0, 1},
	}

	count := other.FindIslands(&graph)
	if count != 4 {
		t.Errorf("Islands failed, invalid number of islands")
	}
}
