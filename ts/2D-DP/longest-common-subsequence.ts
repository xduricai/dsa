export function longestCommonSubsequence(text1: string, text2: string): number {
    const dp = Array(text1.length + 1)
        .fill(null)
        .map((_) => Array(text2.length + 1).fill(0));

    for (let row = 0; row < text1.length; row++) {
        for (let col = 0; col < text2.length; col++) {
            if (text1[row] === text2[col]) {
                dp[row + 1][col + 1] = 1 + dp[row][col];
            } else {
                dp[row + 1][col + 1] = Math.max(
                    dp[row][col + 1],
                    dp[row + 1][col]
                );
            }
        }
    }
    return dp[text1.length][text2.length];
}
