export function getFinalState(
    nums: number[],
    k: number,
    multiplier: number
): number[] {
    for (let iter = 0; iter < k; iter++) {
        let minIdx = 0;

        for (let idx = 0; idx < nums.length; idx++) {
            if (nums[idx] < nums[minIdx]) {
                minIdx = idx;
            }
        }

        nums[minIdx] *= multiplier;
    }

    return nums;
}
