// LC 2348 (https://leetcode.com/problems/number-of-zero-filled-subarrays)

export function zeroFilledSubarray(nums: number[]): number {
    let curr = 0;
    let res = 0;

    for (const num of nums) {
        if (num === 0) {
            curr++;
            res += curr;
        } else {
            curr = 0;
        }
    }

    return res;
};