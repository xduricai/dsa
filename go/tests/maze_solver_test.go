package tests

import (
	"testing"

	. "github.com/xduricai/dsa/go/other"
)

func TestMazeSolver(t *testing.T) {
	maze := []string{
		"xxxxxxxxxx x",
		"x        x x",
		"x        x x",
		"x xxxxxxxx x",
		"x          x",
		"x xxxxxxxxxx",
	}

	solution := []Point{
		*NewPoint(10, 0),
		*NewPoint(10, 1),
		*NewPoint(10, 2),
		*NewPoint(10, 3),
		*NewPoint(10, 4),
		*NewPoint(9, 4),
		*NewPoint(8, 4),
		*NewPoint(7, 4),
		*NewPoint(6, 4),
		*NewPoint(5, 4),
		*NewPoint(4, 4),
		*NewPoint(3, 4),
		*NewPoint(2, 4),
		*NewPoint(1, 4),
		*NewPoint(1, 5),
	}

	start := NewPoint(10, 0)
	end := NewPoint(1, 5)
	path := Solve(maze, 'x', start, end)

	if len(path) != len(solution) {
		t.Errorf("Path is of invalid length\nExpected: %d\nActual: %d", len(solution), len(path))
	}

	for idx := range path {
		if path[idx].X != solution[idx].X || path[idx].Y != path[idx].Y {
			t.Errorf("Path is incorrect, error found on step %d", idx)
		}
	}

}
