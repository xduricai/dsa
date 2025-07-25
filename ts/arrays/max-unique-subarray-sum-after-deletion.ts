// LC 3487 (https://leetcode.com/problems/maximum-unique-subarray-sum-after-deletion)

export function maxSum(nums: number[]): number {
    const set = new Set<number>();
    let max = -Infinity;
    let res = 0;

    for (const num of nums) {
        set.add(num);
        max = Math.max(max, num);
    }

    for (const num of set) {
        if (num > 0) {
            res += num;
        }
    }

    if (max <= 0) {
        return max;
    }
    return res;
}
