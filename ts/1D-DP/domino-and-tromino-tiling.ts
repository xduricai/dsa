// LC 790 (https://leetcode.com/problems/domino-and-tromino-tiling)

export function numTilings(n: number): number {
    const mod = 1_000_000_007n;
    const DP = [0n, 1n, 1n];

    for (let iter = 1; iter < n; iter++) {
        const temp = DP[0] + DP[2] + DP[2];
        DP[0] = DP[1];
        DP[1] = DP[2];
        DP[2] = temp;
    }

    return Number(DP[2] % mod);
}
