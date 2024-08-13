export function change(amount: number, coins: number[]): number {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let idx = coin; idx <= amount; idx++) {
            dp[idx] += dp[idx - coin];
        }
    }
    return dp[amount];
}
