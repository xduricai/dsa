// LC 594 (https://leetcode.com/problems/longest-harmonious-subsequence)

export function findLHS(nums: number[]): number {
    const counter = new Map<number, number>();
    let res = 0;

    for (const num of nums) {
        const count = counter.get(num) || 0;
        counter.set(num, count + 1);
    }

    for (const [num, count] of counter) {
        const lower = counter.get(num - 1) || 0;
        const higher = counter.get(num + 1) || 0;
        const max = count + Math.max(lower, higher);

        if (max !== count && max > res) {
            res = max;
        }
    }

    return res;
}
