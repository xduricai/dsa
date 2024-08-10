export function lengthOfLIS(nums: number[]): number {
    const lis = Array(nums.length).fill(1);

    for (let idx = 0; idx < nums.length; idx++) {
        for (let num = 0; num < idx; num++) {
            if (nums[num] < nums[idx]) {
                lis[idx] = Math.max(lis[idx], lis[num] + 1);
            }
        }
    }
    return Math.max(...lis);
}
