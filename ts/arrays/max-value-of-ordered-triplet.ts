// LC 2873, 2874 (https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii)

// O(n) time O(1) memory solution
export function maximumTripletValue(nums: number[]): number {
    let maxDiff = 0;
    let maxNum = 0;
    let res = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        res = Math.max(res, maxDiff * nums[idx]);
        maxDiff = Math.max(maxDiff, maxNum - nums[idx]);
        maxNum = Math.max(maxNum, nums[idx]);
    }

    return res;
}

// O(n) time O(n) memory solution
export function maximumTripletValueAlt(nums: number[]): number {
    const n = nums.length;
    const prefix = Array(n).fill(0);
    const suffix = Array(n).fill(0);
    let res = 0;

    prefix[0] = nums[0];
    suffix[n - 1] = nums[n - 1];

    for (let idx = 1; idx < n; idx++) {
        prefix[idx] = Math.max(prefix[idx - 1], nums[idx]);
        suffix[n - idx - 1] = Math.max(suffix[n - idx], nums[n - idx - 1]);
    }

    for (let idx = 1; idx < n - 1; idx++) {
        res = Math.max(res, (prefix[idx - 1] - nums[idx]) * suffix[idx + 1]);
    }

    return res;
}

// brute force solution
export function maximumTripletValueBF(nums: number[]): number {
    const n = nums.length;
    let res = 0;

    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                res = Math.max(res, (nums[i] - nums[j]) * nums[k]);
            }
        }
    }

    return res;
}
