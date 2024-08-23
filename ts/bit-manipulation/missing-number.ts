export function missingNumber(nums: number[]): number {
    let result = nums.length;

    for (let idx = 0; idx < nums.length; idx++) {
        result ^= nums[idx];
        result ^= idx;
    }
    return result;
}

export function missingNumberAlt(nums: number[]): number {
    let result = nums.length;

    for (let idx = 0; idx < nums.length; idx++) {
        result += idx - nums[idx];
    }
    return result;
}
