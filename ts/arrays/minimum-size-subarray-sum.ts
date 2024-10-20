export function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0;
    let sum = 0;
    let min = nums.length + 1;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (left < right && sum - nums[left] >= target) {
            sum -= nums[left];
            left++;
        }

        if (sum >= target) {
            min = Math.min(min, right - left + 1);
        }
    }
    return min > nums.length ? 0 : min;
}
