// LC 3201 (https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i)

export function maximumLength(nums: number[]): number {
    let odd = 0;
    let even = 0;
    let mixed = 0;
    let lastEven = nums[0] % 2 === 1;

    for (const num of nums) {
        if (num % 2) {
            odd++;

            if (lastEven) {
                mixed++;
                lastEven = false;
            }
        } else {
            even++;

            if (!lastEven) {
                mixed++;
                lastEven = true;
            }
        }
    }

    return Math.max(even, odd, mixed);
};