export function numberOfPaths(grid: number[][], k: number): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const PRIME = 10 ** 9 + 7;

    let dp = Array.from({ length: COLS + 1 }, () => new Map());
    dp[1].set(0, 1);

    for (let row = 1; row <= ROWS; row++) {
        const current = Array.from({ length: COLS + 1 }, () => new Map());

        for (let col = 1; col <= COLS; col++) {
            const value = grid[row - 1][col - 1];

            for (const [remainder, count] of dp[col]) {
                current[col].set((remainder + value) % k, count % PRIME);
            }

            for (const [remainder, count] of current[col - 1]) {
                const currCount =
                    current[col].get((remainder + value) % k) || 0;
                current[col].set(
                    (remainder + value) % k,
                    (currCount + count) % PRIME
                );
            }
        }
        dp = current;
    }

    return dp[COLS].get(0) || 0;
}
