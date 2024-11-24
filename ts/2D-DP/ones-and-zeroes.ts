export function findMaxForm(strs: string[], m: number, n: number): number {
    const dp = new Map<string, number>();

    const getCount = (str: string) => {
        let zeroes = 0;
        let ones = 0;

        for (const char of str) {
            if (char === "0") {
                zeroes++;
            } else if (char === "1") {
                ones++;
            }
        }

        return [zeroes, ones];
    };

    for (const str of strs) {
        const [strZeroes, strOnes] = getCount(str);

        // iterate over all keys in the map with enough zeroes and ones to fit the current string
        for (let zeroIdx = m; zeroIdx >= strZeroes; zeroIdx--) {
            for (let oneIdx = n; oneIdx >= strOnes; oneIdx--) {
                const key = `${zeroIdx}-${oneIdx}`;

                // get max value for current string not included
                let res = dp.get(key) || 0;

                // get max value for current string included
                res = Math.max(
                    res,
                    1 +
                        (dp.get(`${zeroIdx - strZeroes}-${oneIdx - strOnes}`) ||
                            0)
                );
                dp.set(key, res);
            }
        }
    }

    return dp.get(`${m}-${n}`) || 0;
}

// DFS solution
export function findMaxFormAlt(strs: string[], m: number, n: number): number {
    const dp = new Map<string, number>();

    const getCount = (idx: number) => {
        let zeroes = 0;
        let ones = 0;

        for (const char of strs[idx]) {
            if (char === "0") {
                zeroes++;
            } else if (char === "1") {
                ones++;
            }
        }

        return [zeroes, ones];
    };

    const dfs = (idx: number, zeroes: number, ones: number) => {
        if (idx === strs.length) {
            return 0;
        }

        const key = `${idx}-${zeroes}-${ones}`;
        if (dp.has(key)) {
            return dp.get(key);
        }

        const [numZeroes, numOnes] = getCount(idx);
        let res = dfs(idx + 1, zeroes, ones);
        dp.set(key, res);

        if (zeroes + numZeroes <= m && ones + numOnes <= n) {
            res = Math.max(
                res,
                1 + dfs(idx + 1, zeroes + numZeroes, ones + numOnes)
            );
            dp.set(key, res);
        }

        return res;
    };

    return dfs(0, 0, 0);
}
