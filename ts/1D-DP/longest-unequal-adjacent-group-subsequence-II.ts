// LC 2901 (https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-ii)

export function getWordsInLongestSubsequence(
    words: string[],
    groups: number[]
): string[] {
    const n = words.length;
    // length of longest sequence ending at idx
    const DP = Array(n).fill(1);
    // previous element in longest sequence ending at idx
    const prev = Array.from({ length: n }, (_, idx) => idx);
    let max = 0;

    for (let end = 1; end < n; end++) {
        for (let idx = 0; idx < end; idx++) {
            // pair is a valid match and the sequence ending at idx is at least as long as the longest sequence ending at end
            if (
                DP[idx] >= DP[end] &&
                groups[idx] !== groups[end] &&
                isValid(words[idx], words[end])
            ) {
                DP[end] = DP[idx] + 1;
                prev[end] = idx;
            }
        }

        // new longest sequence found
        if (DP[end] > DP[max]) {
            max = end;
        }
    }

    const res = [words[max]];
    let idx = max;

    while (prev[idx] !== idx) {
        idx = prev[idx];
        res.push(words[idx]);
    }

    return res.reverse();
}

// distance check for a pair of words
function isValid(wordA: string, wordB: string) {
    if (wordA.length !== wordB.length) {
        return false;
    }
    let oneDiff = false;

    for (let idx = 0; idx < wordA.length; idx++) {
        if (wordA[idx] === wordB[idx]) {
            continue;
        }

        if (oneDiff) {
            return false;
        }
        oneDiff = true;
    }

    return oneDiff;
}
