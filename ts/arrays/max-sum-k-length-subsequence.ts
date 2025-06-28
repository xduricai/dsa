// LC 2099 (https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum)

export function maxSubsequence(nums: number[], k: number): number[] {
    return nums
        .map((num, idx) => [num, idx])
        .sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]))
        .slice(0, k)
        .sort((a, b) => a[1] - b[1])
        .map(([num, idx]) => num);
}
