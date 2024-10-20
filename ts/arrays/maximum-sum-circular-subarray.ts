export function maxSubarraySumCircular(nums: number[]): number {
    let total = 0;
    let localMin = 0;
    let localMax = 0;
    let globalMin = nums[0];
    let globalMax = nums[0];

    for (const num of nums) {
        total += num;
        localMin = Math.min(localMin + num, num);
        localMax = Math.max(localMax + num, num);
        globalMin = Math.min(localMin, globalMin);
        globalMax = Math.max(localMax, globalMax);
    }

    if (globalMax < 0) {
        return globalMax;
    }
    return Math.max(globalMax, total - globalMin);
}
