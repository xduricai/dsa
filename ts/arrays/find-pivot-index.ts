export function pivotIndex(nums: number[]): number {
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const prefix = Array(nums.length);
    prefix[0] = 0;

    for (let idx = 1; idx < nums.length; idx++) {
        prefix[idx] = prefix[idx - 1] + nums[idx - 1];
    }

    for (let idx = 0; idx < nums.length; idx++) {
        if (prefix[idx] === (sum - nums[idx]) / 2) {
            return idx;
        }
    }

    return -1;
}
