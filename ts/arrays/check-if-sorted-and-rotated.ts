export function check(nums: number[]): boolean {
    let rotated = false;

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx - 1] > nums[idx]) {
            if (rotated) {
                return false;
            }
            rotated = true;
        }
    }

    if (rotated) {
        return nums.at(-1) <= nums[0];
    }
    return true;
}
