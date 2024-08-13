// starting bottom right of the grid, going top left
export function isInterleave(s1: string, s2: string, s3: string): boolean {
    if (s1.length + s2.length !== s3.length) {
        return false;
    }

    const dp = Array(s1.length + 1)
        .fill(null)
        .map((_) => Array(s2.length + 1).fill(false));
    dp[s1.length][s2.length] = true;

    for (let row = s1.length; row >= 0; row--) {
        for (let col = s2.length; col >= 0; col--) {
            if (
                row < s1.length &&
                s1[row] === s3[row + col] &&
                dp[row + 1][col]
            ) {
                dp[row][col] = true;
            }
            if (
                col < s2.length &&
                s2[col] === s3[row + col] &&
                dp[row][col + 1]
            ) {
                dp[row][col] = true;
            }
        }
    }
    return dp[0][0];
}

// starting top left, going bottom right
export function isInterleaveAlt(s1: string, s2: string, s3: string): boolean {
    if (s1.length + s2.length !== s3.length) {
        return false;
    }

    const dp = Array(s1.length + 1)
        .fill(null)
        .map((_) => Array(s2.length + 1).fill(false));
    dp[0][0] = true;

    for (let row = 0; row <= s1.length; row++) {
        for (let col = 0; col <= s2.length; col++) {
            if (row < s1.length && s1[row] === s3[row + col] && dp[row][col]) {
                dp[row + 1][col] = true;
            }
            if (col < s2.length && s2[col] === s3[row + col] && dp[row][col]) {
                dp[row][col + 1] = true;
            }
        }
    }
    return dp[s1.length][s2.length];
}
