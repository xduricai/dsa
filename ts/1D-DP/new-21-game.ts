// LC 837 (https://leetcode.com/problems/new-21-game)

export function new21Game(n: number, k: number, maxPts: number): number {
    const DP = Array(n + 1).fill(0);
    DP[0] = 1;
    let chance = k ? 1 : 0;
    let res = 0;

    for (let idx = 1; idx <= n; idx++) {
        DP[idx] = chance / maxPts;

        if (idx < k) {
            chance += DP[idx];
        }
        if (idx - maxPts >= 0 && idx - maxPts < k) {
            chance -= DP[idx - maxPts];
        }
    }

    for (let idx = k; idx <= n; idx++) {
        res += DP[idx];
    }

    return res;
};