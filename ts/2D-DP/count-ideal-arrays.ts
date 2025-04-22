// LC 2338 (https://leetcode.com/problems/count-the-number-of-ideal-arrays)

// DFS solution, gives TLE
export function idealArrays(n: number, maxValue: number): number {
    const mod = 10 ** 9 + 7;
    const dp = new Map<string, number>();
    let res = 0;

    const dfs = (idx: number, num: number) => {
        if (idx === n - 1) {
            return 1;
        }

        const key = `${idx}-${num}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        const max = Math.floor(maxValue / num);
        let count = 0;

        for (let mult = 1; mult <= max; mult++) {
            count += dfs(idx + 1, num * mult);
            count %= mod;
        }

        dp.set(key, count);
        return count;
    };

    for (let start = 1; start <= maxValue; start++) {
        res += dfs(0, start);
        res %= mod;
    }

    return res;
}
