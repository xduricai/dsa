// LC 368 (https://leetcode.com/problems/largest-divisible-subset)

// tabulsation solution
export function largestDivisibleSubset(nums: number[]): number[] {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const dp = Array.from({ length: n }, (_, idx) => [nums[idx]]);
    let res = [];

    for (let start = n - 1; start >= 0; start--) {
        for (let idx = start + 1; idx < n; idx++) {
            if (nums[idx] % nums[start]) {
                continue;
            }
            if (dp[idx].length >= dp[start].length) {
                dp[start] = [nums[start], ...dp[idx]];
            }
        }

        if (dp[start].length > res.length) {
            res = dp[start];
        }
    }

    return res;
}

// DFS solution
export function largestDivisibleSubsetDfs(nums: number[]): number[] {
    nums.sort((a, b) => a - b);
    const cache = new Map<number, number[]>();

    const dfs = (start: number) => {
        if (cache.has(start)) {
            return [...cache.get(start)];
        }

        let res = [];

        for (let idx = start + 1; idx < nums.length; idx++) {
            if (nums[idx] % nums[start]) {
                continue;
            }
            const arr = dfs(idx);

            if (arr.length > res.length) {
                res = arr;
            }
        }

        res.push(nums[start]);
        cache.set(start, res);
        return [...res];
    };

    let res = [];

    for (let idx = 0; idx < nums.length; idx++) {
        const arr = dfs(idx);

        if (arr.length > res.length) {
            res = arr;
        }
    }

    return res;
}
