// LC 2016 (https://leetcode.com/problems/maximum-difference-between-increasing-elements)

export function maximumDifference(nums: number[]): number {
    let res = -1;
    let min = nums[0];

    for (const num of nums) {
        min = Math.min(min, num);
        res = Math.max(res, num - min);
    }

    if (res < 1) {
        return -1;
    }
    return res;
}
