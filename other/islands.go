package other

// markAdjecent recursively finds and marks all adjecent pieces of land
func markAdjecent(row int, col int, graph *[][]int, seen *[][]bool) {
	height := len(*graph)
	width := len((*graph)[0])

	if row < 0 || col < 0 || row >= height || col >= width {
		return
	}
	if (*graph)[row][col] == 0 {
		return
	}
	if (*seen)[row][col] {
		return
	}

	(*seen)[row][col] = true
	markAdjecent(row+1, col, graph, seen)
	markAdjecent(row-1, col, graph, seen)
	markAdjecent(row, col+1, graph, seen)
	markAdjecent(row, col-1, graph, seen)
}

// FindIslands looks at a graph of 1's (land) and 0's (ocean) where and counts the number of islands within said graph
// an island is understood to be a group of adjecent 1's
func FindIslands(graph *[][]int) int {
	height := len(*graph)
	width := len((*graph)[0])

	seen := make([][]bool, height)
	for i := range seen {
		seen[i] = make([]bool, width)
	}
	count := 0

	for row := 0; row < height; row++ {
		for col := 0; col < width; col++ {
			if seen[row][col] {
				continue
			}
			if (*graph)[row][col] == 0 {
				seen[row][col] = true
				continue
			}
			count++
			markAdjecent(row, col, graph, &seen)
		}
	}
	return count
}
