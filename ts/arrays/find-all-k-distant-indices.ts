// LC 2200 (https://leetcode.com/problems/find-all-k-distant-indices-in-an-array)

export function findKDistantIndices(
    nums: number[],
    key: number,
    k: number
): number[] {
    const n = nums.length;
    const nearest = Array(n).fill(Infinity);
    const res = [];
    let lastKey = -1;

    for (let idx = n - 1; idx >= 0; idx--) {
        if (nums[idx] === key) {
            lastKey = idx;
        }
        if (lastKey !== -1) {
            nearest[idx] = lastKey - idx;
        }
    }

    lastKey = -1;

    for (let idx = 0; idx < n; idx++) {
        if (nums[idx] === key) {
            lastKey = idx;
        }
        if (lastKey !== -1) {
            nearest[idx] = Math.min(nearest[idx], idx - lastKey);
        }
        if (nearest[idx] <= k) {
            res.push(idx);
        }
    }

    return res;
}
