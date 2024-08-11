export function maxProfit(prices: number[]): number {
    const dp = new Map<string, number>();

    const dfs = (idx: number, canBuy: boolean) => {
        if (idx >= prices.length) {
            return 0;
        }

        const key = `${idx}-${canBuy}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        const cooldown = dfs(idx + 1, canBuy);
        if (canBuy) {
            const buy = dfs(idx + 1, false) - prices[idx];
            dp.set(key, Math.max(buy, cooldown));
        } else {
            const sell = dfs(idx + 2, true) + prices[idx];
            dp.set(key, Math.max(sell, cooldown));
        }
        return dp.get(key);
    };
    return dfs(0, true);
}
