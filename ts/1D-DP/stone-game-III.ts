export function stoneGameIII(stoneValue: number[]): string {
    const n = stoneValue.length;
    const dp = Array(n + 1).fill(0);

    for (let idx = n - 1; idx >= 0; idx--) {
        let take = 0;
        let max = -Infinity;

        for (let i = idx; i < Math.min(n, idx + 3); i++) {
            take += stoneValue[i];
            max = Math.max(max, take - dp[i + 1]);
        }

        dp[idx] = max;
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
}

export function stoneGameIIIDfs(stoneValue: number[]): string {
    const n = stoneValue.length;
    const dp = Array(n).fill(null);

    const dfs = (start: number) => {
        if (start >= n) {
            return 0;
        }
        if (dp[start] !== null) {
            return dp[start];
        }

        let res = -Infinity;
        let take = 0;

        for (let idx = start; idx < Math.min(start + 3, n); idx++) {
            take += stoneValue[idx];
            res = Math.max(res, take - dfs(idx + 1));
        }

        dp[start] = res;
        return res;
    };

    const res = dfs(0);

    if (res > 0) return "Alice";
    if (res < 0) return "Bob";
    return "Tie";
}

export function stoneGameIIIDfaAlt(stoneValue: number[]): string {
    const n = stoneValue.length;
    const dp = Array(n).fill(null);
    const suffixSums = Array(n).fill(0);
    suffixSums[n - 1] = stoneValue[n - 1];

    for (let idx = n - 2; idx >= 0; idx--) {
        suffixSums[idx] = suffixSums[idx + 1] + stoneValue[idx];
    }

    const dfs = (start: number) => {
        if (start >= n) {
            return 0;
        }
        if (dp[start] !== null) {
            return dp[start];
        }

        let res = -Infinity;

        for (let idx = start + 1; idx <= start + 3; idx++) {
            res = Math.max(res, suffixSums[start] - dfs(idx));
        }

        dp[start] = res;
        return res;
    };

    const alice = dfs(0);
    const res = alice - (suffixSums[0] - alice);

    if (res > 0) return "Alice";
    if (res < 0) return "Bob";
    return "Tie";
}
