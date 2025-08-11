// LC 2438 (https://leetcode.com/problems/range-product-queries-of-powers)

export function productQueries(n: number, queries: number[][]): number[] {
    const mod = 10 ** 9 + 7;
    const powers = [];

    for (let num = 1; num <= n; num <<= 1) {
        if (num & n) {
            powers.push(num);
        }
    }

    const len = powers.length;
    const res = Array.from({ length: len }, () => Array(len).fill(0));

    for (let left = 0; left < len; left++) {
        res[left][left] = powers[left];

        for (let right = left + 1; right < len; right++) {
            res[left][right] = (res[left][right - 1] * powers[right]) % mod;
        }
    }

    return queries.map(([left, right]) => res[left][right]);
}

export function productQueriesAlt(n: number, queries: number[][]): number[] {
    const mod = 10 ** 9 + 7;
    const powers = [];

    for (let num = 1; num <= n; num <<= 1) {
        if (num & n) {
            powers.push(num);
        }
    }

    return queries.map(([left, right]) => {
        let res = 1;

        for (let idx = left; idx <= right; idx++) {
            res *= powers[idx];
            res %= mod;
        }
        return res;
    });
}
