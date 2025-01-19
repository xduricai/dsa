export function longestPalindrome(s: string): number {
    const counter = new Map<string, number>();
    let oddCount = -1;
    let res = 0;

    for (const char of s) {
        const count = counter.get(char) || 0;
        counter.set(char, count + 1);
    }

    for (const [char, count] of counter) {
        if (count % 2 === 1) {
            oddCount++;
        }
        res += count;
    }

    if (oddCount > 0) {
        res -= oddCount;
    }
    return res;
}
