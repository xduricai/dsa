// true Dp
export function maximumProfit(
    profit: number[],
    weight: number[],
    capacity: number
) {
    // dp[item][capacity]
    const dp: number[][] = Array(profit.length)
        .fill(null)
        .map((_) => Array(capacity + 1).fill(0));

    for (let cap = 0; cap <= capacity; cap++) {
        if (weight[0] <= cap) {
            dp[0][cap] = profit[0];
        }
    }

    for (let item = 1; item < profit.length; item++) {
        for (let cap = 1; cap <= capacity; cap++) {
            const skip = dp[item - 1][cap];
            let include = 0;

            if (weight[item] <= cap) {
                include = profit[item] + dp[item - 1][cap - weight[item]];
            }

            dp[item][cap] = Math.max(skip, include);
        }
    }

    return dp[profit.length - 1][capacity];
}

// memoization
export function maximumProfitAlt(
    profit: number[],
    weight: number[],
    capacity: number
) {
    const cache: number[][] = Array(profit.length)
        .fill(null)
        .map((_) => Array(capacity + 1).fill(-1));

    const dfs = (idx: number, currentWeight: number) => {
        if (idx === profit.length) {
            return 0;
        }

        if (cache[idx][currentWeight] !== -1) {
            return cache[idx][currentWeight];
        }

        cache[idx][currentWeight] = dfs(idx + 1, currentWeight);
        const newWeight = currentWeight + weight[idx];

        if (newWeight <= capacity) {
            const newProfit = profit[idx] + dfs(idx + 1, newWeight);
            cache[idx][currentWeight] = Math.max(
                cache[idx][currentWeight],
                newProfit
            );
        }

        return cache[idx][currentWeight];
    };

    return dfs(0, 0);
}
