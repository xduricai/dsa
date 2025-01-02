export function tribonacci(n: number): number {
    const dp = [0, 1, 1];

    if (n <= 2) {
        return dp[n];
    }

    for (let num = 2; num < n; num++) {
        const sum = dp[0] + dp[1] + dp[2];

        dp[0] = dp[1];
        dp[1] = dp[2];
        dp[2] = sum;
    }

    return dp[2];
}
