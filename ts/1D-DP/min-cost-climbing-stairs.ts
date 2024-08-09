export function minCostClimbingStairs(cost: number[]) {
    const dp = [0, 0];

    for (let stair of cost) {
        const sum = stair + Math.min(dp[0], dp[1]);
        dp[0] = dp[1];
        dp[1] = sum;
    }
    return Math.min(dp[0], dp[1]);
}
