export function minCostClimbingStairs(cost: number[]) {
    const dp = [cost[0], cost[1]];

    for (let idx = 2; idx < cost.length; idx++) {
        const sum = cost[idx] + Math.min(dp[0], dp[1]);
        dp[0] = dp[1];
        dp[1] = sum;
    }
    return Math.min(dp[0], dp[1]);
}
