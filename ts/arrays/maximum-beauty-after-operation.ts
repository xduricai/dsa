export function maximumBeauty(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let max = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        while (left < right && nums[left] + k + k < nums[right]) {
            left++;
        }
        max = Math.max(max, right - left + 1);
    }
    return max;
}
