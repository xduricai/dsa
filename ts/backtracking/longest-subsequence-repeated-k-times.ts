// LC 2014 (https://leetcode.com/problems/longest-subsequence-repeated-k-times)

export function longestSubsequenceRepeatedK(s: string, k: number): string {
    const a = "a".charCodeAt(0);
    const counter = Array(26).fill(0);
    const letters = [];
    const queue = [];
    let res = "";

    for (const char of s) {
        counter[char.charCodeAt(0) - a]++;
    }

    for (let idx = 25; idx >= 0; idx--) {
        if (counter[idx] >= k) {
            const char = String.fromCharCode(a + idx);
            letters.push(char);
            queue.push(char);
        }
    }

    while (queue.length) {
        let curr = queue.shift();

        if (curr.length > res.length) {
            res = curr;
        }

        for (const char of letters) {
            const next = `${curr}${char}`;

            if (checkPattern(s, k, next)) {
                queue.push(next);
            }
        }
    }

    return res;
}

function checkPattern(s: string, k: number, pattern: string): boolean {
    let count = 0;
    let idx = 0;

    for (const char of s) {
        if (char !== pattern[idx]) {
            continue;
        }

        idx++;

        if (idx === pattern.length) {
            idx = 0;
            count++;

            if (count >= k) {
                return true;
            }
        }
    }

    return false;
}
