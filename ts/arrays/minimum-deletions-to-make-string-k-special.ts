// LC 3085 (https://leetcode.com/problems/minimum-deletions-to-make-string-k-special)

export function minimumDeletions(word: string, k: number): number {
    const a = "a".charCodeAt(0);
    let counter = Array(26).fill(0);
    let res = word.length;

    for (const char of word) {
        counter[char.charCodeAt(0) - a]++;
    }
    counter = counter.filter((count) => count > 0);

    // try each count as the minimum allowed count
    for (const base of counter) {
        const max = base + k;
        let removed = 0;

        for (const num of counter) {
            if (num < base) {
                removed += num;
            } else {
                removed += Math.max(0, num - max);
            }
        }
        res = Math.min(res, removed);
    }

    return res;
}
