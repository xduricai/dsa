// LC 2176 (https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array)

export function countPairs(nums: number[], k: number): number {
    let res = 0;

    for (let left = 0; left < nums.length - 1; left++) {
        for (let right = left + 1; right < nums.length; right++) {
            if (nums[left] === nums[right] && left * right % k === 0) {
                res++;
            }
        }
    }

    return res;
};