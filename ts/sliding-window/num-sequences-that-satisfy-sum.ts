// LC 1498 (https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition)

export function numSubseq(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    const MOD = 10 ** 9 + 7;
    const pows = [1];
    let right = nums.length - 1;
    let res = 0;

    for (let idx = 1; idx <= nums.length; idx++) {
        pows.push((pows.at(-1) * 2) % MOD);
    }

    for (let left = 0; left <= right; left++) {
        while (left <= right && nums[left] + nums[right] > target) {
            right--;
        }
        if (left > right) {
            break;
        }

        res += pows[right - left];
        res %= MOD;
    }

    return res;
}
