export function rob(nums: number[]): number {
    const dp = [0, 0];

    for (let idx = 0; idx < nums.length; idx++) {
        const sum = Math.max(dp[0] + nums[idx], dp[1]);
        dp[0] = dp[1];
        dp[1] = sum;
    }
    return dp[1];
}
