export function maximumProfit(
    profit: number[],
    weight: number[],
    capacity: number
) {
    const DP = Array(capacity + 1).fill(0);

    for (let item = 0; item < profit.length; item++) {
        for (let cap = weight[item]; cap <= capacity; cap++) {
            DP[cap] = Math.max(DP[cap], DP[cap - weight[item]] + profit[item]);
        }
    }

    return DP[capacity];
}
