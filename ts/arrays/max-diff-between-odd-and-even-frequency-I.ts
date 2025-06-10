// LC 3442 (https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i)

export function maxDifference(s: string): number {
    const counter = Array(26).fill(0);
    const a = "a".charCodeAt(0);
    let minEven = s.length;
    let maxOdd = 0;

    for (const char of s) {
        counter[char.charCodeAt(0) - a]++;
    }

    for (let count of counter) {
        if (!count) {
            continue;
        }
        if (count % 2 === 0) {
            minEven = Math.min(count, minEven);
        } else {
            maxOdd = Math.max(count, maxOdd);
        }
    }

    return maxOdd - minEven;
}
