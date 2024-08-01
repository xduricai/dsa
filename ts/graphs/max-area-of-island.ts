export function maxAreaOfIsland(grid: number[][]): number {
    const seen = new Set<string>();
    let max = 0;

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
    }

    const dfs = (row: number, col: number) => {
        if (!inBounds(row, col) || seen.has(`${row}-${col}`) || grid[row][col] === 0) {
            return 0;
        }
        seen.add(`${row}-${col}`);
        
        return 1 
            + dfs(row - 1, col)
            + dfs(row, col + 1)
            + dfs(row + 1, col)
            + dfs(row, col - 1);
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (seen.has(`${row}-${col}`)) continue;

            if (grid[row][col] === 1) {
                max = Math.max(max, dfs(row, col));
            } else {
                seen.add(`${row}-${col}`);
            }
        }
    }
    return max;
};