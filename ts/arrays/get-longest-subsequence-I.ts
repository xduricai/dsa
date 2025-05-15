// LC 2900 (https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i)

export function getLongestSubsequence(
    words: string[],
    groups: number[]
): string[] {
    const res = [];
    let prev = -1;

    for (let idx = 0; idx < groups.length; idx++) {
        if (groups[idx] !== prev) {
            res.push(words[idx]);
            prev = groups[idx];
        }
    }

    return res;
}
