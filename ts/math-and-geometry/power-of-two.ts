// LC 231 (https://leetcode.com/problems/power-of-two)

export function isPowerOfTwo(n: number): boolean {
    if (n < 1) {
        return false;
    }

    while (n > 1) {
        if (n >> 1 !== n / 2) {
            return false;
        }
        n >>= 1;
    }

    return true;
}

export function isPowerOfTwoAlt(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}
