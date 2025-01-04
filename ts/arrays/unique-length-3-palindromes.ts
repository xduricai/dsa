export function countPalindromicSubsequence(s: string): number {
    const A = "a".charCodeAt(0);
    const indices = Array.from({ length: 26 }, () => [s.length, -1]);
    let total = 0;

    // find the first and last occurrence of each letter
    for (let idx = 0; idx < s.length; idx++) {
        const code = s[idx].charCodeAt(0) - A;
        indices[code][0] = Math.min(indices[code][0], idx);
        indices[code][1] = Math.max(indices[code][1], idx);
    }

    // for each letter, count the number of unique letters between the first and last occurrence
    for (const [left, right] of indices) {
        if (left + 1 >= right) {
            continue;
        }
        const seen = new Set();

        for (let idx = left + 1; idx < right; idx++) {
            seen.add(s[idx]);
        }

        total += seen.size;
    }

    return total;
}

export function countPalindromicSubsequenceAlt(s: string): number {
    const res = new Set<string>();
    const left = new Set<string>();
    const right = new Map<string, number>();

    for (const char of s) {
        const count = right.get(char) || 0;
        right.set(char, count + 1);
    }

    for (const char of s) {
        right.set(char, right.get(char) - 1);

        for (const c of left) {
            if (right.get(c)) {
                res.add(`${c}${char}`);
            }
        }

        left.add(char);
    }

    return res.size;
}
