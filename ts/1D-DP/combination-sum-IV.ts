export function combinationSum4(nums: number[], target: number): number {
    const DP = Array(target + 1).fill(0);
    DP[0] = 1;

    for (let idx = 1; idx <= target; idx++) {
        for (const num of nums) {
            if (idx >= num) {
                DP[idx] += DP[idx - num];
            }
        }
    }

    return DP[target];
}
