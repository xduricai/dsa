export function minDistance(word1: string, word2: string): number {
    const dp = Array(word1.length + 1)
        .fill(null)
        .map((_) => Array(word2.length).fill(0));

    for (let idx = 0; idx <= word1.length; idx++) {
        dp[idx][0] = idx;
    }

    for (let idx = 0; idx <= word2.length; idx++) {
        dp[0][idx] = idx;
    }

    for (let row = 0; row < word1.length; row++) {
        for (let col = 0; col < word2.length; col++) {
            if (word1[row] === word2[col]) {
                dp[row + 1][col + 1] = dp[row][col];
            } else {
                dp[row + 1][col + 1] =
                    1 +
                    Math.min(dp[row][col], dp[row + 1][col], dp[row][col + 1]);
            }
        }
    }
    return dp[word1.length][word2.length];
}
