// optimized DP
export function lastStoneWeightII(stones: number[]): number {
    const sum = stones.reduce((acc, curr) => acc + curr, 0);
    const target = Math.ceil(sum / 2);
    const dp = Array(target + 1).fill(0);

    for (const weight of stones) {
        for (let idx = target; idx >= weight; idx--) {
            dp[idx] = Math.max(dp[idx], dp[idx - weight] + weight);
        }
    }

    return Math.abs(sum - 2 * dp[target]);
}

// DP
export function lastStoneWeightIIAlt(stones: number[]): number {
    let currentDP = new Set<number>([0]);

    for (const stone of stones) {
        const nextDP = new Set<number>();

        for (const weight of currentDP) {
            nextDP.add(weight + stone);
            nextDP.add(weight - stone);
        }

        currentDP = nextDP;
    }

    const positive = [...currentDP].filter((weight) => weight >= 0);
    return Math.min(...positive);
}

// DFS + memoization
export function lastStoneWeightIIDfs(stones: number[]): number {
    const stoneSum = stones.reduce((acc, current) => acc + current, 0);
    const target = Math.ceil(stoneSum / 2);
    const DP = new Map<string, number>();

    const dfs = (idx: number, sum: number) => {
        if (sum >= target || idx === stones.length) {
            return Math.abs(sum - (stoneSum - sum));
        }

        const key = `${idx}-${sum}`;
        if (DP.has(key)) {
            return DP.get(key);
        }

        let res = Math.min(dfs(idx + 1, sum), dfs(idx + 1, sum + stones[idx]));
        DP.set(key, res);

        return res;
    };

    return dfs(0, 0);
}
