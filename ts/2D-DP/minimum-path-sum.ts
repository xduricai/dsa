export function minPathSum(grid: number[][]): number {
    const COLS = grid[0].length;
    let dp = Array(COLS + 1).fill(Infinity);
    dp[1] = 0;

    for (const row of grid) {
        const current = Array(COLS + 1).fill(Infinity);

        for (let idx = 1; idx <= COLS; idx++) {
            current[idx] = row[idx - 1] + Math.min(dp[idx], current[idx - 1]);
        }

        dp = current;
    }

    return dp[COLS];
}
