export function maxSubArray(nums: number[]): number {
    let bestMax = nums[0];
    let currMax = nums[0];

    for (let idx = 1; idx < nums.length; idx++) {
        currMax = Math.max(currMax + nums[idx], nums[idx]);
        bestMax = Math.max(currMax, bestMax);
    }
    return bestMax;
}
