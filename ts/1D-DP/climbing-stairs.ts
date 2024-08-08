export function climbStairs(n: number): number {
    const dp = [1, 1];

    for (let iter = 0; iter < n - 1; iter++) {
        const sum = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = sum;
    }
    return dp[1];
}
