export function maxScore(s: string): number {
    let ones = 0;
    let zeroes = 0;
    let max = 0;

    for (const char of s) {
        if (char === "1") {
            ones++;
        }
    }

    // right substring must have a length of at least 1
    for (let idx = 0; idx < s.length - 1; idx++) {
        if (s[idx] === "0") {
            zeroes++;
        } else {
            ones--;
        }

        max = Math.max(max, zeroes + ones);
    }

    return max;
}
