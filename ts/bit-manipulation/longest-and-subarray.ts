// approach based on number properties
export function longestSubarray(nums: number[]): number {
    let currentMax = 0; // current maximum discovered value in array
    let size = 0; // size of the sliding window
    let res = 0; // return value

    for (const num of nums) {
        if (num > currentMax) {
            currentMax = num;
            size = 1;
            res = 1;
        } else if (num === currentMax) {
            size++;
        } else {
            size = 0;
        }
        res = Math.max(res, size);
    }
    return res;
}

// traditional greedy approach
export function longestSubarrayAlt(nums: number[]): number {
    let currentMax = nums[0];
    let bestMax = nums[0];

    let currentLength = 1;
    let bestLength = 1;

    for (let idx = 1; idx < nums.length; idx++) {
        if ((currentMax & nums[idx]) < nums[idx]) {
            currentMax = nums[idx];
            currentLength = 1;
        } else {
            currentMax &= nums[idx];
            currentLength++;
        }

        if (currentMax === bestMax) {
            bestLength = Math.max(currentLength, bestLength);
        } else if (currentMax > bestMax) {
            bestMax = currentMax;
            bestLength = currentLength;
        }
    }
    return bestLength;
}
