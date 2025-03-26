// LC 2033 (https://leetcode.com/problems/minimum-operations-to-make-a-uni-value-grid)

export function minOperations(grid: number[][], x: number): number {
    const nums = grid.flatMap((row) => row).sort((a, b) => a - b);
    const mid = nums.length >> 1;
    const target = nums[mid];
    let res = 0;

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx] % x !== nums[0] % x) {
            return -1;
        }
    }

    for (let idx = 0; idx < mid; idx++) {
        res += target - nums[idx];
    }

    for (let idx = mid + 1; idx < nums.length; idx++) {
        res += nums[idx] - target;
    }

    return res / x;
}
