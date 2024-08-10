export function numDecodings(s: string): number {
    if (s && s[0] === "0") {
        return 0;
    }

    const dp = [1, 1];

    for (let idx = 0; idx < s.length; idx++) {
        if (s[idx] === "0") {
            return 0;
        }
        if (idx + 1 === s.length) {
            return dp[1];
        }
        const num = parseInt(s[idx]) * 10 + parseInt(s[idx + 1]);

        if (num > 26) {
            dp[0] = dp[1];
        } else if (num % 10 === 0) {
            dp[1] = dp[0];
            idx++;
        } else {
            const temp = dp[0] + dp[1];
            dp[0] = dp[1];
            dp[1] = temp;
        }
    }
    return dp[1];
}
