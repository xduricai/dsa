export function longestIncreasingPath(matrix: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    const dp = Array(ROWS)
        .fill(null)
        .map((_) => Array(COLS).fill(0));

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < ROWS && col < COLS;
    };

    const dfs = (row: number, col: number, previous: number) => {
        if (!inBounds(row, col) || matrix[row][col] <= previous) {
            return 0;
        }
        if (dp[row][col]) {
            return dp[row][col];
        }

        let res = 1;
        for (const [r, c] of DIRS) {
            res = Math.max(res, 1 + dfs(row + r, col + c, matrix[row][col]));
        }
        dp[row][col] = res;
        return res;
    };

    let max = 1;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            max = Math.max(max, dfs(row, col, -1));
        }
    }
    return max;
}
