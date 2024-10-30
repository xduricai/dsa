export function minimumMountainRemovals(nums: number[]): number {
    const lis = Array(nums.length).fill(1);
    const lds = Array(nums.length).fill(1);

    for (let idx = 0; idx < nums.length; idx++) {
        for (let num = 0; num < idx; num++) {
            if (nums[num] < nums[idx]) {
                lis[idx] = Math.max(lis[idx], lis[num] + 1);
            }
        }
    }

    for (let idx = nums.length - 1; idx >= 0; idx--) {
        for (let num = nums.length - 1; num > idx; num--) {
            if (nums[num] < nums[idx]) {
                lds[idx] = Math.max(lds[idx], lds[num] + 1);
            }
        }
    }

    let max = 0;
    for (let idx = 0; idx < nums.length; idx++) {
        if (lis[idx] > 1 && lds[idx] > 1) {
            max = Math.max(max, lis[idx] + lds[idx] - 1);
        }
    }
    return nums.length - max;
}
