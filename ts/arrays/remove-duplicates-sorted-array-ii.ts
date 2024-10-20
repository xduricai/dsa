export function removeDuplicates(nums: number[]): number {
    let left = 0;
    let right = 0;

    while (left < nums.length) {
        while (nums[left] === nums[right + 1] && right + 1 < nums.length) {
            right++;
        }

        if (right !== left) {
            nums.splice(left + 2, right - left - 1);
            left += 2;
        } else {
            left += 1;
        }
        right = left;
    }
    return nums.length;
}
