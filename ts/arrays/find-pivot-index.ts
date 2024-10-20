export function pivotIndex(nums: number[]): number {
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    let leftSum = 0;
    let rightSum = sum;

    for (let idx = 0; idx < nums.length; idx++) {
        rightSum -= nums[idx];

        if (leftSum === rightSum) {
            return idx;
        }
        leftSum += nums[idx];
    }

    return -1;
}
