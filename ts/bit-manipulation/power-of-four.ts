// LC 342 (https://leetcode.com/problems/power-of-four/description)

export function isPowerOfFour(n: number): boolean {
    while (n > 1) {
        if (n & 1 || n & 2) {
            return false;
        }
        n >>= 2;
    }
    return n === 1;
};