export function search(nums: number[], target: number): boolean {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = (left + right) >> 1;

        if (nums[mid] === target) {
            return true;
        }

        // left sorted portion
        if (nums[left] < nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // right sorted portion
        else if (nums[left] > nums[mid]) {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // uncertain
        else {
            left++;
        }
    }

    return false;
}
