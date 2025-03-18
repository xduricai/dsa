export function longestNiceSubarray(nums: number[]): number {
    let res = 0;
    let curr = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        while (left < right && (curr & nums[right]) !== 0) {
            curr ^= nums[left];
            left++;
        }

        curr |= nums[right];
        res = Math.max(res, right - left + 1);
    }

    return res;
}
