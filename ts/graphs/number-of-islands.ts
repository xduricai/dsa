export function numIslands(grid: string[][]): number {
    const seen = Array(grid.length)
        .fill(null)
        .map((_) => Array(grid[0].length).fill(false));
    let islands = 0;

    const inBounds = (row: number, col: number) => {
        return (
            row >= 0 && col >= 0 && row < grid.length && col < grid[0].length
        );
    };

    const dfs = (row: number, col: number) => {
        if (!inBounds(row, col) || seen[row][col] || grid[row][col] === "0") {
            return;
        }
        seen[row][col] = true;

        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row + 1, col);
        dfs(row, col - 1);
    };

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (seen[row][col]) continue;

            if (grid[row][col] === "1") {
                islands++;
                dfs(row, col);
            } else {
                seen[row][col] = true;
            }
        }
    }
    return islands;
}
