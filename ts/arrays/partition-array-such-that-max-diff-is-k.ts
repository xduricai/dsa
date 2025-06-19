// LC 2294 (https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k)

export function partitionArray(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let max = nums[0] + k;
    let res = 1;

    for (const num of nums) {
        if (num > max) {
            max = num + k;
            res++;
        }
    }

    return res;
}
