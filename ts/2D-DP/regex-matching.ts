export function isMatch(s: string, p: string): boolean {
    const dp = new Map<string, boolean>();

    const dfs = (sIdx: number, pIdx: number) => {
        const key = `${sIdx}-${pIdx}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        if (sIdx >= s.length && pIdx >= p.length) {
            return true;
        }

        if (pIdx >= p.length) {
            return false;
        }

        const match =
            sIdx < s.length && (s[sIdx] === p[pIdx] || p[pIdx] === ".");
        let res = false;

        if (pIdx + 1 < p.length && p[pIdx + 1] === "*") {
            res =
                dfs(sIdx, pIdx + 2) || // skipping the *
                (match && dfs(sIdx + 1, pIdx)); // using the * (current characters have to match)
        } else if (match) {
            res = dfs(sIdx + 1, pIdx + 1);
        }

        dp.set(key, res);
        return res;
    };
    return dfs(0, 0);
}
