// more compact solution
export function numDistinct(s: string, t: string): number {
    let dp = Array(t.length + 1).fill(0);
    dp[0] = 1;

    for (let row = 1; row <= s.length; row++) {
        const current = Array(t.length + 1).fill(0);
        current[0] = 1;

        for (let col = 1; col <= row; col++) {
            current[col] = dp[col];

            if (s[row - 1] === t[col - 1]) {
                current[col] += dp[col - 1];
            }
        }
        dp = current;
    }
    return dp[t.length];
}

export function numDistinctAlt(s: string, t: string): number {
    const dp = Array(s.length + 1)
        .fill(null)
        .map((_) => Array(t.length + 1).fill(0));

    for (let idx = 0; idx < s.length; idx++) {
        dp[idx][0] = 1;
    }

    for (let row = 0; row < s.length; row++) {
        for (let col = 0; col < t.length; col++) {
            if (s[row] === t[col]) {
                dp[row + 1][col + 1] = dp[row][col] + dp[row][col + 1];
            } else {
                dp[row + 1][col + 1] = dp[row][col + 1];
            }
        }
    }
    return dp[s.length][t.length];
}
