export function minDistance(word1: string, word2: string): number {
    let dp = Array(word2.length + 1).fill(0);

    for (let col = 1; col <= word2.length; col++) {
        dp[col] = col;
    }

    for (let row = 1; row <= word1.length; row++) {
        const current = Array(word2.length + 1).fill(0);
        current[0] = row;

        for (let col = 1; col <= word2.length; col++) {
            if (word1[row - 1] === word2[col - 1]) {
                current[col] = dp[col - 1];
            } else {
                current[col] =
                    1 + Math.min(dp[col - 1], dp[col], current[col - 1]);
            }
        }

        dp = current;
    }

    return dp[word2.length];
}

export function minDistanceAlt(word1: string, word2: string): number {
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
