// LC 2787 (https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers)

export function numberOfWays(n: number, x: number): number {
    const mod = 10 ** 9 + 7;
    const nums = [];

    for (let num = 1; Math.pow(num, x) <= n; num++) {
        nums.push(Math.pow(num, x));
    }

    const dp = Array(n + 1).fill(0);
    dp[0] = 1;

    for (const num of nums) {
        for (let idx = n; idx >= num; idx--) {
            dp[idx] += dp[idx - num];
            dp[idx] %= mod;
        }
    }

    return dp[n];
}
