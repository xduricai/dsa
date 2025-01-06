export function firstMissingPositive(nums: number[]): number {
    const n = nums.length;
    let idx = 0;

    while (idx < n) {
        const correctIdx = nums[idx] - 1;

        // swap a number to its appropriate index if possible
        // idx has to be in bounds of the array
        // the number at correctIdx must not be the same to avoid an infinite loop
        if (
            correctIdx >= 0 &&
            correctIdx < n &&
            nums[idx] !== nums[correctIdx]
        ) {
            nums[idx] = nums[correctIdx];
            nums[correctIdx] = correctIdx + 1;
        } else {
            idx++;
        }
    }

    // find the first index that does not have the appropriate number
    for (let idx = 0; idx < n; idx++) {
        if (nums[idx] !== idx + 1) {
            return idx + 1;
        }
    }

    // array contains numbers 1..n
    return nums.length + 1;
}

export function firstMissingPositiveAlt(nums: number[]): number {
    // keep going up the chain of numbers
    for (const num of nums) {
        let current = num;

        while (current <= nums.length && current > 0) {
            const idx = current - 1;
            current = nums[idx];
            nums[idx] = Infinity;
        }
    }

    for (let idx = 0; idx < nums.length; idx++) {
        if (nums[idx] !== Infinity) {
            return idx + 1;
        }
    }

    return nums.length + 1;
}
