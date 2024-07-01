export function search(nums: number[], target: number): number {
    let low = 0;
    let hi = nums.length - 1;

    while (low <= hi) {
        const mid = Math.floor((low + hi) / 2);
        if (nums[mid] === target) return mid;

        if (nums[mid] >= nums[0]) {
            if (nums[mid] < target || nums[0] > target) low = mid + 1;
            else hi = mid - 1;
        } else {
            if (nums[mid] > target || nums[nums.length - 1] > target) hi = mid - 1;
            else low = mid + 1;
        }
    }
    return -1;
}

export function searchAlt(nums: number[], target: number): number {
    let low = 0;
    let hi = nums.length - 1;

    while (low <= hi) {
        const mid = Math.floor((low + hi) / 2);
        if (nums[mid] === target) return mid;

        if (nums[mid] >= nums[0]) {
            if (target < nums[mid] && target >= nums[0]) hi = mid - 1;
            else low = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[nums.length - 1]) low = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}