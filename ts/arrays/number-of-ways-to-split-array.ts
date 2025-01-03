export function waysToSplitArray(nums: number[]): number {
    const total = nums.reduce((acc, curr) => acc + curr, 0);
    let sum = 0;
    let count = 0;

    for (let idx = 0; idx < nums.length - 1; idx++) {
        sum += nums[idx];

        if (sum >= total - sum) {
            count++;
        }
    }

    return count;
}
