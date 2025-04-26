// LC 2444 (https://leetcode.com/problems/count-subarrays-with-fixed-bounds)

export function countSubarrays(
    nums: number[],
    minK: number,
    maxK: number
): number {
    let lastMin = -1;
    let lastMax = -1;
    let left = 0;
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] < minK || nums[right] > maxK) {
            lastMin = -1;
            lastMax = -1;
            left = right + 1;
            continue;
        }

        if (nums[right] === minK) {
            lastMin = right;
        }
        if (nums[right] === maxK) {
            lastMax = right;
        }
        if (lastMin !== -1 && lastMax !== -1) {
            res += Math.min(lastMin, lastMax) - left + 1;
        }
    }

    return res;
}
