// DP
export function findTargetSumWays(nums: number[], target: number): number {
    let currentCounts = new Map<number, number>([[0, 1]]);

    for (const num of nums) {
        const nextCounts = new Map<number, number>();

        for (const [sum, count] of currentCounts.entries()) {
            const add = nextCounts.get(sum + num) || 0;
            nextCounts.set(sum + num, add + count);

            const subtract = nextCounts.get(sum - num) || 0;
            nextCounts.set(sum - num, subtract + count);
        }

        currentCounts = nextCounts;
    }

    return currentCounts.get(target) || 0;
}

// DFS + memoization
export function findTargetSumWaysAlt(nums: number[], target: number): number {
    const dp = new Map<string, number>();

    const dfs = (idx: number, sum: number) => {
        if (idx === nums.length) {
            if (sum === target) {
                return 1;
            }
            return 0;
        }

        const key = `${idx}-${sum}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        const res =
            dfs(idx + 1, sum - nums[idx]) + dfs(idx + 1, sum + nums[idx]);
        dp.set(key, res);
        return res;
    };
    return dfs(0, 0);
}
