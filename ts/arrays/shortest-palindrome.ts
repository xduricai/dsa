// Rabin-Karp solution
export function shortestPalindrome(s: string): string {
    const BASE = 29;
    const MOD = 10 ** 9 + 7;
    const OFFSET = "a".charCodeAt(0) - 1;

    const getValue = (char: string) => char.charCodeAt(0) - OFFSET;

    let prefix = 0;
    let suffix = 0;
    let maxIdx = 0;
    let power = 1;

    for (let idx = 0; idx < s.length; idx++) {
        prefix = (prefix * BASE) % MOD;
        prefix += getValue(s[idx]);

        suffix = (suffix + getValue(s[idx]) * power) % MOD;
        power = (power * BASE) % MOD;

        if (prefix === suffix) {
            maxIdx = idx;
        }
    }
    const prepend = s
        .slice(maxIdx + 1)
        .split("")
        .reverse()
        .join("");
    return `${prepend}${s}`;
}

// brute force solution
export function shortestPalindromeBF(s: string): string {
    let end: number;

    for (end = s.length; end > 0; end--) {
        if (isPalindrome(s.slice(0, end))) {
            break;
        }
    }

    if (end === 0) {
        end = 1;
    }

    const suffix = s.slice(end);
    const prefix = suffix.split("").reverse().join("");
    return `${prefix}${s}`;
}

function isPalindrome(s: string) {
    let left = 0;
    let right = s.length - 1;

    while (left <= right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
