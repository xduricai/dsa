export function countGoodStrings(low: number, high: number, zero: number, one: number): number {
    const PRIME = 10 ** 9 + 7;
    const dp = Array(high + 1).fill(0);
    dp[0] = 1;

    for (let idx = 1; idx <= high; idx++) {
        if (idx >= one) {
            dp[idx] += dp[idx - one];
        }
        if (idx >= zero) {
            dp[idx] += dp[idx - zero];
        }
        dp[idx] %= PRIME;
    }

    let res = 0;
    for (let idx = low; idx <= high; idx++) {
        res += dp[idx] % PRIME;
    }

    return res % PRIME;
};

export function countGoodStringsDfs(low: number, high: number, zero: number, one: number): number {
    const PRIME = 10 ** 9 + 7;
    const dp = new Map<number, number>();

    const dfs = (idx: number) => {
        if (idx > high) {
            return 0;
        }
        if (dp.has(idx)) {
            return dp.get(idx);
        }

        let res = dfs(idx + one) + dfs(idx + zero);
        if (idx >= low) {
            res += 1;
        }

        res %= PRIME;
        dp.set(idx, res);

        return res;
    }

    return dfs(0);
};