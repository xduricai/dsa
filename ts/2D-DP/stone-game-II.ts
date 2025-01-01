// DFS solution using suffix sums
export function stoneGameII(piles: number[]): number {
    const n = piles.length;
    const suffixSums = Array(n).fill(0);
    const DP = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    suffixSums[n - 1] = piles[n - 1];

    // compute suffix sums for the whole input array
    for (let idx = n - 2; idx >= 0; idx--) {
        suffixSums[idx] = suffixSums[idx + 1] + piles[idx];
    }

    const dfs = (idx: number, M: number) => {
        // value has already been computed
        if (DP[idx][M]) {
            return DP[idx][M];
        }

        // current player can take all of the remaining stones on this turn
        if (idx + M + M >= n) {
            return suffixSums[idx];
        }

        for (let X = 1; X <= M + M; X++) {
            // total remaining score minus the opponent's best possible score in their remaining turns
            const score = suffixSums[idx] - dfs(idx + X, Math.max(X, M));
            DP[idx][M] = Math.max(DP[idx][M], score);
        }

        return DP[idx][M];
    };

    return dfs(0, 1);
}

// bottom-up DP solution using suffix sums
export function stoneGameIIAlt(piles: number[]): number {
    const n = piles.length;
    const suffixSums = Array(n).fill(0);
    const DP = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    suffixSums[n - 1] = piles[n - 1];

    // compute suffix sums for the whole input array
    for (let idx = n - 2; idx >= 0; idx--) {
        suffixSums[idx] = suffixSums[idx + 1] + piles[idx];
    }

    for (let idx = n - 1; idx >= 0; idx--) {
        for (let M = 1; M <= n; M++) {
            for (let X = 1; X <= M * 2; X++) {
                if (idx + X > n) {
                    break;
                }

                // total remaining score minus the opponent's best possible score in their remaining turns
                const score = suffixSums[idx] - DP[idx + X][Math.max(M, X)];
                DP[idx][M] = Math.max(DP[idx][M], score);
            }
        }
    }

    return DP[0][1];
}

// DFS approach with differing approach based on whose turn it is
export function stoneGameIIDfsAlt(piles: number[]): number {
    const dp = new Map<string, number>();

    const dfs = (idx: number, M: number, alice: boolean) => {
        if (idx >= piles.length) {
            return 0;
        }

        const key = `${idx}-${M}-${alice}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        let res = alice ? 0 : Infinity;
        let total = 0;

        for (let X = 1; X <= M + M; X++) {
            if (idx + X > piles.length) {
                break;
            }
            total += piles[idx + X - 1];
            const newM = Math.max(X, M);

            if (alice) {
                res = Math.max(res, total + dfs(idx + X, newM, !alice));
            } else {
                res = Math.min(res, dfs(idx + X, newM, !alice));
            }
        }

        dp.set(key, res);
        return res;
    };

    return dfs(0, 1, true);
}
