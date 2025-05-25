// LC 2131 (https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words)

export function longestPalindrome(words: string[]): number {
    const diff = new Map<string, [number, number]>();
    const same = new Map<string, number>();

    for (const word of words) {
        if (word[0] === word[1]) {
            const count = same.get(word[0]) || 0;
            same.set(word[0], count + 1);
            continue;
        }

        const incLeft = word[0] < word[1];
        const key = incLeft ? word : `${word[1]}${word[0]}`;
        const counts = diff.get(key);

        if (counts) {
            incLeft ? counts[0]++ : counts[1]++;
        } else {
            diff.set(key, incLeft ? [1, 0] : [0, 1]);
        }
    }

    let res = 0;
    let oddSame = false;

    for (const [left, right] of diff.values()) {
        res += Math.min(left, right) << 1;
    }
    for (const count of same.values()) {
        if (count % 2 === 1) {
            oddSame = true;
            res--;
        }
        res += count;
    }

    if (oddSame) {
        res++;
    }

    return res << 1;
}
