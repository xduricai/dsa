export function maximumCount(nums: number[]): number {
    if (nums.at(0) > 0 || nums.at(-1) < 0) {
        return nums.length;
    }

    let left = 0;
    let right = nums.length;

    // find the leftmost non-negative number
    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (nums[mid] < 0) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    // store the result
    const idx = left;
    right = nums.length;

    // find the leftmost positive number
    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (nums[mid] === 0) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return Math.max(idx, nums.length - left);
}
