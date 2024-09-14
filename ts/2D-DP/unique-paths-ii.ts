// more memory efficient solution
export function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const ROWS = obstacleGrid.length;
    const COLS = obstacleGrid[0].length;

    // init a dummy row
    let dp = Array(COLS).fill(0);
    dp[0] = 1;

    for (let row = 0; row < ROWS; row++) {
        const current = Array(COLS).fill(0);
        if (obstacleGrid[row][0] === 0) {
            current[0] = dp[0]; // cannot reach first position if tile above has an obstacle
        }

        for (let col = 1; col < COLS; col++) {
            if (obstacleGrid[row][col] === 1) {
                continue;
            }
            current[col] = dp[col] + current[col - 1];
        }
        dp = current;
    }
    return dp[COLS - 1];
}

export function uniquePathsWithObstaclesAlt(obstacleGrid: number[][]): number {
    const ROWS = obstacleGrid.length;
    const COLS = obstacleGrid[0].length;

    const dp = Array(ROWS)
        .fill(null)
        .map((_) => Array(COLS).fill(0));

    for (let row = 0; row < ROWS; row++) {
        if (obstacleGrid[row][0] === 1) {
            break;
        }
        dp[row][0] = 1;
    }
    for (let col = 0; col < COLS; col++) {
        if (obstacleGrid[0][col] === 1) {
            break;
        }
        dp[0][col] = 1;
    }

    for (let row = 1; row < ROWS; row++) {
        for (let col = 1; col < COLS; col++) {
            if (obstacleGrid[row][col] === 1) {
                continue;
            }
            dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
        }
    }
    return dp[ROWS - 1][COLS - 1];
}
