export function maxProfit(prices: number[]): number {
    let profit = 0;

    for (let idx = 1; idx < prices.length; idx++) {
        if (prices[idx] > prices[idx - 1]) {
            profit += prices[idx] - prices[idx - 1];
        }
    }

    return profit;
}

export function maxProfitAlt(prices: number[]): number {
    let profit = 0;
    let buyPrice = prices[0];

    for (let idx = 1; idx < prices.length; idx++) {
        if (prices[idx] < buyPrice) {
            buyPrice = prices[idx];
        } else {
            profit += prices[idx] - buyPrice;
            buyPrice = prices[idx];
        }
    }

    return profit;
}
