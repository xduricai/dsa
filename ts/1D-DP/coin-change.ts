export function coinChange(coins: number[], amount: number): number {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const coin of coins) {
        for (let target = coin; target <= amount; target++) {
            dp[target] = Math.min(dp[target], dp[target - coin] + 1);
        }
    }

    if (dp[amount] === Infinity) {
        return -1;
    }
    return dp[amount];
}

export function coinChangeAlt(coins: number[], amount: number): number {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let target = 1; target <= amount; target++) {
        for (let coin of coins) {
            if (target - coin >= 0) {
                dp[target] = Math.min(dp[target], 1 + dp[target - coin]);
            }
        }
    }

    if (dp[amount] === Infinity) {
        return -1;
    }
    return dp[amount];
}
