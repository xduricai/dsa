export function continuousSubarrays(nums: number[]): number {
    let count = 0;
    let min = nums[0] - 2;
    let max = nums[0] + 2;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] >= min && nums[right] <= max) {
            min = Math.max(min, nums[right] - 2);
            max = Math.min(max, nums[right] + 2);
        } else {
            left = right - 1;
            min = nums[right] - 2;
            max = nums[right] + 2;

            while (left >= 0 && nums[left] >= min && nums[left] <= max) {
                min = Math.max(min, nums[left] - 2);
                max = Math.min(max, nums[left] + 2);
                left--;
            }

            left++;
        }

        count += right - left + 1;
    }

    return count;
}
