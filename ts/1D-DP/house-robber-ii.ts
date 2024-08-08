export function rob(nums: number[]): number {
    const findMax = (houses: number[]) => {
        const dp = [0, 0];

        for (let house of houses) {
            const sum = Math.max(dp[0] + house, dp[1]);
            dp[0] = dp[1];
            dp[1] = sum;
        }
        return dp[1];
    };

    const res1 = findMax(nums.slice(1));
    const res2 = findMax(nums.slice(0, nums.length - 1));
    return Math.max(nums[0], res1, res2);
}
