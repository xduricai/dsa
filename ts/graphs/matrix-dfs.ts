export function countPaths(grid: number[][]) {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const seen = new Set<string>();

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < ROWS && col < COLS;
    };

    const dfs = (row: number, col: number) => {
        const key = `${row}-${col}`;

        if (!inBounds(row, col) || grid[row][col] === 1 || seen.has(key)) {
            return 0;
        }
        if (row === ROWS - 1 && col === COLS - 1) {
            return 1;
        }

        seen.add(key);
        let count = 0;

        count += dfs(row - 1, col);
        count += dfs(row, col + 1);
        count += dfs(row + 1, col);
        count += dfs(row, col - 1);

        seen.delete(key);
        return count;
    };
    return dfs(0, 0);
}
