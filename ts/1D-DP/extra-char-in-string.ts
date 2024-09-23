export function minExtraChar(s: string, dictionary: string[]): number {
    const dp = Array(s.length);

    for (let idx = 0; idx <= s.length; idx++) {
        dp[idx] = idx;
    }

    for (let idx = 1; idx <= s.length; idx++) {
        for (const word of dictionary) {
            const slice = s.slice(idx - 1);
            const end = idx + word.length - 1;

            if (slice.startsWith(word)) {
                dp[end] = Math.min(dp[end], dp[idx - 1]);
            } else {
                dp[idx] = Math.min(dp[idx], dp[idx - 1] + 1);
            }
        }
    }
    return dp[s.length];
}
