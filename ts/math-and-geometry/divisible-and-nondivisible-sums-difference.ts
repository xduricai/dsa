// LC 2894 (https://leetcode.com/problems/divisible-and-non-divisible-sums-difference)

export function differenceOfSums(n: number, m: number): number {
    const num1 = ((1 + n) * n) / 2;
    const last = n - (n % m);
    // do not divide by 2 because each number is also counted in num1 and needs to be subtracted twice
    const num2 = (m + last) * Math.floor(n / m);

    return num1 - num2;
}
