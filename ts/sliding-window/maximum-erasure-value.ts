// LC 1695 (https://leetcode.com/problems/maximum-erasure-value)

export function maximumUniqueSubarray(nums: number[]): number {
    const set = new Set<number>();
    let sum = 0;
    let res = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        while (set.has(nums[right])) {
            set.delete(nums[left]);
            sum -= nums[left];
            left++;
        }

        sum += nums[right];
        set.add(nums[right]);
        res = Math.max(res, sum);
    }
    return res;
};