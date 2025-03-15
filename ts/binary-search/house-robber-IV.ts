export function minCapability(nums: number[], k: number): number {
    let left = 1;
    let right = Math.max(...nums);

    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (isValid(nums, k, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

function isValid(nums: number[], k: number, max: number): boolean {
    let count = 0;

    for (let idx = 0; idx < nums.length && count < k; idx++) {
        if (nums[idx] <= max) {
            count++;
            idx++;
        }
    }

    return count === k;
}
