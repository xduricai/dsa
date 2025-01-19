// looking forward
export function minExtraChar(s: string, dictionary: string[]): number {
    const dp = Array(s.length + 1);

    for (let idx = 0; idx <= s.length; idx++) {
        dp[idx] = idx;
    }

    for (let idx = 1; idx <= s.length; idx++) {
        for (const word of dictionary) {
            const slice = s.slice(idx - 1);
            const end = idx + word.length - 1;

            if (slice.startsWith(word)) {
                dp[end] = Math.min(dp[end], dp[idx - 1]);
            }
            dp[idx] = Math.min(dp[idx], dp[idx - 1] + 1);
        }
    }
    return dp[s.length];
}

// looking backward
export function minExtraCharAlt(s: string, dictionary: string[]): number {
    const dp = Array(s.length + 1);

    for (let idx = 0; idx <= s.length; idx++) {
        dp[idx] = idx;
    }

    for (let idx = 1; idx <= s.length; idx++) {
        const slice = s.slice(0, idx);

        for (const word of dictionary) {
            if (word.length > idx) {
                continue;
            }

            if (slice.endsWith(word)) {
                dp[idx] = Math.min(dp[idx], dp[idx - word.length]);
            }
            dp[idx] = Math.min(dp[idx], dp[idx - 1] + 1);
        }
    }

    return dp[s.length];
}
