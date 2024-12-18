export function maxCoins(nums: number[]): number {
    nums.unshift(1);
    nums.push(1);
    const N = nums.length;
    const dp: number[][] = Array.from({ length: N }, () =>
        new Array(N).fill(0)
    );

    // length of the window must be at least 2 and less than N
    for (let length = 2; length < N; length++) {
        // check all L/R pairs for current window size
        for (let left = 0; left < N - length; left++) {
            const right = left + length;

            for (let idx = left + 1; idx < right; idx++) {
                // calculate coin gain for the current window
                const coins =
                    dp[left][idx] +
                    dp[idx][right] +
                    nums[left] * nums[idx] * nums[right];

                // update current cell if needed
                dp[left][right] = Math.max(dp[left][right], coins);
            }
        }
    }

    return dp[0][N - 1];
}

export function maxCoinsAlt(nums: number[]): number {
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

export function maxCoinsDfs(nums: number[]): number {
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
