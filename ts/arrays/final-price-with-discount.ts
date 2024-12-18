export function finalPrices(prices: number[]): number[] {
    const stack = [];

    for (let idx = 0; idx < prices.length; idx++) {
        while (stack.length && prices[stack.at(-1)] >= prices[idx]) {
            const itemIdx = stack.pop();
            prices[itemIdx] -= prices[idx];
        }

        stack.push(idx);
    }

    return prices;
}
