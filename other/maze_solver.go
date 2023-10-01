package other

// dirs holds a vector representing a move in each of the 4 possible directions on a 2D grid
var dirs = [4][2]int{
	{0, 1},
	{1, 0},
	{0, -1},
	{-1, 0},
}

// Points holds the x and y coordinates for a given point
type Point struct {
	X int
	Y int
}

// NewPoint is a constructor method for the Point struct
func NewPoint(ptX int, ptY int) *Point {
	return &Point{
		X: ptX,
		Y: ptY,
	}
}

// Walk is a recursive function that attempts to find a way through the maze by checking all 4 directions for each point on the path while also remembering visited points
func Walk(maze []string, wall rune, curr *Point, end *Point, seen [][]bool, path *[]Point) bool {
	if curr.X < 0 || curr.Y < 0 || curr.X >= len(maze[0]) || curr.Y >= len(maze) {
		return false
	}
	if rune(maze[curr.Y][curr.X]) == wall {
		return false
	}
	if seen[curr.Y][curr.X] {
		return false
	}
	if curr.X == end.X && curr.Y == end.Y {
		*path = append(*path, *end)
		return true
	}

	seen[curr.Y][curr.X] = true
	*path = append(*path, *curr)

	for idx := range dirs {
		x, y := dirs[idx][0], dirs[idx][1]
		next := NewPoint(curr.X+x, curr.Y+y)
		foundEnd := Walk(maze, wall, next, end, seen, path)

		if foundEnd {
			return true
		}
	}

	*path = (*path)[:len(*path)-1]

	return false
}

// Solve returns a slice of Points representing the path through a maze
// Our maze is represented by an array of strings and walls are represented by a rune chosen by the caller
func Solve(maze []string, wall rune, start *Point, end *Point) []Point {
	path := []Point{}
	seen := make([][]bool, len(maze))
	for col := range seen {
		seen[col] = make([]bool, len(maze[0]))
	}

	Walk(maze, wall, start, end, seen, &path)
	return path
}
