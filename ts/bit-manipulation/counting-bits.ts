export function countBits(n: number): number[] {
    const dp = Array(n + 1).fill(0);
    let offset = 1;

    for (let idx = 1; idx <= n; idx++) {
        if (offset * 2 === idx) {
            offset = idx;
        }
        dp[idx] = 1 + dp[idx - offset];
    }
    return dp;
}
