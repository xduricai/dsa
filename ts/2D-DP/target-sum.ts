export function findTargetSumWays(nums: number[], target: number): number {
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
