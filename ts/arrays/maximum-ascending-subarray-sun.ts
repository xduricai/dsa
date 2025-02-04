export function maxAscendingSum(nums: number[]): number {
    let max = nums[0];
    let curr = nums[0];

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx - 1] < nums[idx]) {
            curr += nums[idx];
            max = Math.max(max, curr);
        } else {
            curr = nums[idx];
        }
    }

    return max;
}
