// LC 2 (2311) https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k

// O(n) optimal solution
export function longestSubsequence(s: string, k: number): number {
    const chars = s.split("").reverse();
    let sum = 0;
    let count = 0;
    let maxIdx = Math.log2(k) + 1;

    for (let idx = 0; idx < chars.length; idx++) {
        if (chars[idx] === "0") {
            count++;
        } else if (idx < maxIdx && sum + (1 << idx) <= k) {
            sum += 1 << idx;
            count++;
        }
    }

    return count;
}

// O(n^2) brute force solution
export function longestSubsequenceBF(s: string, k: number): number {
    const MAX = 10 ** 9;
    const pows = [1];
    const chars = s.split("").reverse();
    let res = 1;

    while (pows.at(-1) < MAX) {
        pows.push(pows.at(-1) * 2);
    }

    for (let start = 0; start < chars.length; start++) {
        let count = 0;
        let sum = 0;

        for (let idx = 0; idx + start < chars.length; idx++) {
            if (chars[start + idx] === "0") {
                count++;
            } else if (idx < pows.length && sum + pows[idx] <= k) {
                sum += pows[idx];
                count++;
            }
        }

        res = Math.max(res, count);
    }

    return res;
}
