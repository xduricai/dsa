// bottom-up solution, space optimized
export function stoneGame(piles: number[]): boolean {
    const sum = piles.reduce((acc, curr) => acc + curr, 0);
    const n = piles.length;
    let dp = Array(n).fill(0);

    for (let left = n - 1; left >= 0; left--) {
        const current = Array(n).fill(0);

        for (let right = left; right < n; right++) {
            // if left and right are equal, bob only has option left so the action is irrelevant
            if (left === right) {
                continue;
            }

            // on Alice's turns, there will always be one odd and one even index
            const alice = (left + right) % 2 === 1;

            if (alice) {
                // on Alice's turn, we want to head down the path where Alice had more points on her previous turn
                current[right] = Math.max(
                    dp[right] + piles[left],
                    current[right - 1] + piles[right]
                );
            } else {
                // on Bob's turn, we want to go down the path where Alice had fewer points on her previous turn
                current[right] = Math.min(dp[right], current[right - 1]);
            }
        }
        dp = current;
    }

    // if Alice's highest possible score is greater than half the total point amount she wins
    return dp[n - 1] > sum >> 1;
}

// bottom-up solution
export function stoneGameAlt(piles: number[]): boolean {
    const sum = piles.reduce((acc, curr) => acc + curr, 0);
    const n = piles.length;
    const DP = Array.from({ length: n }, () => Array(n).fill(0));

    for (let left = n - 1; left >= 0; left--) {
        for (let right = left; right < n; right++) {
            // if left and right are equal, bob only has option left so the action is irrelevant
            if (left === right) {
                continue;
            }

            // on Alice's turns, there will always be one odd and one even index
            const alice = (left + right) % 2 === 1;

            if (alice) {
                // on Alice's turn, we want to head down the path where Alice had more points on her previous turn
                DP[left][right] = Math.max(
                    DP[left + 1][right] + piles[left],
                    DP[left][right - 1] + piles[right]
                );
            } else {
                // on Bob's turn, we want to go down the path where Alice had fewer points on her previous turn
                DP[left][right] = Math.min(
                    DP[left + 1][right],
                    DP[left][right - 1]
                );
            }
        }
    }

    // if Alice's highest possible score is greater than half the total point amount she wins
    return DP[0][n - 1] > sum >> 1;
}

export function stoneGameDfs(piles: number[]): boolean {
    const sum = piles.reduce((acc, curr) => acc + curr, 0);
    const n = piles.length;
    const DP = Array.from({ length: n }, () => Array(n).fill(0));

    const dfs = (left: number, right: number, alice: boolean) => {
        if (left > right) {
            return 0;
        }

        if (DP[left][right]) {
            return DP[left][right];
        }

        const resLeft = dfs(left + 1, right, !alice);
        const resRight = dfs(left, right - 1, !alice);

        if (alice) {
            DP[left][right] = Math.max(
                piles[left] + resLeft,
                piles[right] + resRight
            );
        } else {
            DP[left][right] = Math.min(resLeft, resRight);
        }

        return DP[left][right];
    };

    return dfs(0, n - 1, true) > sum >> 1;
}
