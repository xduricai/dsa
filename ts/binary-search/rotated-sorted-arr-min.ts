export function findMin(nums: number[]): number {
    let res = nums[0];
    let low = 0;
    let hi = nums.length - 1;

    while (low <= hi) {
        if(nums[low] < nums[hi]) {
            res = Math.min(res, nums[low]);
            return res;
        }
        const mid = Math.floor((low + hi) / 2);
        res = Math.min(res, nums[mid]);

        if (nums[mid] >= nums[low]) low = mid + 1;
        else hi = mid - 1;
    }
    return res;
};

export function findMinAlt(nums: number[]): number | null {
    let left = 0;
    let right = nums.length - 1;
    
    if (nums[left] < nums[right]) return nums[0];

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (mid > 0 && nums[mid] < nums[mid - 1]) return nums[mid];
        if (nums[mid] < nums[0]) right = mid - 1;
        else left = mid + 1;
    }
    return null;
}