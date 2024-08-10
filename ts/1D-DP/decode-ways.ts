export function numDecodings(s: string): number {
    const dp = [1, 1];

    for (let idx = 0; idx < s.length; idx++) {
        const preprevious = dp[0];

        dp[0] = dp[1];
        if (s[idx] === "0") {
            dp[1] = 0;
        }

        const num = parseInt(s.slice(idx - 1, idx + 1));
        if (idx >= 0 && num >= 10 && num <= 26) {
            dp[1] += preprevious;
        }
    }
    return dp[1];
}
