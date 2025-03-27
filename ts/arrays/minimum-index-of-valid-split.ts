// LC 2780 (https://leetcode.com/problems/minimum-index-of-a-valid-split)

export function minimumIndex(nums: number[]): number {
    let dominant = 0;
    let count = 1;

    // find the dominant element
    for (let idx = 0; idx < nums.length; idx++) {
        if (nums[idx] === dominant) {
            count++;
        } else if (count > 1) {
            count--;
        } else {
            dominant = nums[idx];
        }
    }

    // count the number of occurrences
    count = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        if (nums[idx] === dominant) {
            count++;
        }
    }

    // find the minimum split index
    let left = 0;
    let right = count;

    for (let idx = 0; idx < nums.length; idx++) {
        if (nums[idx] === dominant) {
            left++;
            right--;
        }

        if (left > (idx + 1) / 2 && right > (nums.length - idx - 1) / 2) {
            return idx;
        }
    }

    return -1;
}
