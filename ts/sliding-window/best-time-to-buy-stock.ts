export function maxProfit(prices: number[]) {
    let max = 0;
    let left = 0;
    let right = 1;

    while (right < prices.length) {
        if (prices[left] < prices[right])
            max = Math.max(max, prices[right] - prices[left]);
        else left = right;
        right++;
    }
    return max;
}
