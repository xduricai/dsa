export function maxCoins(nums: number[]): number {
    nums.unshift(1);
    nums.push(1);

    const dp = Array(nums.length)
        .fill(null)
        .map((_) => Array(nums.length).fill(0));

    const dfs = (left: number, right: number) => {
        if (left > right) {
            return 0;
        }

        if (dp[left][right]) {
            return dp[left][right];
        }

        for (let idx = left; idx <= right; idx++) {
            let coins = nums[left - 1] * nums[idx] * nums[right + 1];
            coins += dfs(left, idx - 1) + dfs(idx + 1, right);
            dp[left][right] = Math.max(coins, dp[left][right]);
        }
        return dp[left][right];
    };

    return dfs(1, nums.length - 2);
}

export function maxCoinsAlt(nums: number[]): number {
    const dp = new Map();
    nums.unshift(1);
    nums.push(1);

    const dfs = (left: number, right: number) => {
        if (left > right) {
            return 0;
        }

        const key = `${left}-${right}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        for (let idx = left; idx <= right; idx++) {
            let coins = nums[left - 1] * nums[idx] * nums[right + 1];
            coins += dfs(left, idx - 1) + dfs(idx + 1, right);

            const current = dp.get(key) || 0;
            dp.set(key, Math.max(current, coins));
        }
        return dp.get(key);
    };

    return dfs(1, nums.length - 2);
}
