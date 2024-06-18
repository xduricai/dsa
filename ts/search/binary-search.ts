export function binarySearch(nums: number[], target: number): number {
    let low = 0;
    let hi = nums.length;

    while (low < hi) {
        const mid = Math.floor(low + (hi - low) / 2);

        if (nums[mid] === target) return mid;
        if (nums[mid] > target) hi = mid;
        else low = mid + 1;
    }
    
    return -1;
};