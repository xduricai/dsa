// optimal iterative solution
export function isMatch(s: string, p: string): boolean {
    const ROWS = s.length;
    const COLS = p.length;

    let dp = Array(COLS + 1).fill(false);
    // empty string and empty pattern always match
    dp[0] = true;

    for (let col = 1; col <= COLS; col++) {
        // star patterns can have 0 characters, meaning if the pattern before them matched, it will still match
        if (p[col - 1] === "*") {
            dp[col] = dp[col - 1] || dp[col - 2];
        }
    }

    for (let row = 1; row <= ROWS; row++) {
        const current = Array(COLS + 1).fill(false);

        for (let col = 1; col <= COLS; col++) {
            // character in word matches character in pattern
            if (s[row - 1] === p[col - 1] || p[col - 1] === ".") {
                current[col] = dp[col - 1];
            }
            // characters did not match and pattern character is not a star
            if (p[col - 1] !== "*") {
                continue;
            }

            // current character matches current star pattern
            if (p[col - 2] === "." || s[row - 1] === p[col - 2]) {
                // check if pattern matched before adding current character OR before adding current character and the star pattern
                current[col] = dp[col] || dp[col - 2];
            }

            // current character might not match current star pattern
            // check if current character matched before the current star pattern (star pattern substring will have 0 characters)
            current[col] ||= current[col - 2];
        }

        dp = current;
    }

    return dp[COLS];
}

// iterative solution, suboptimal memory complexity
export function isMatchAlt(s: string, p: string): boolean {
    const ROWS = s.length;
    const COLS = p.length;

    const dp = Array.from({ length: ROWS + 1 }, () =>
        Array(COLS + 1).fill(false)
    );
    // empty string and empty pattern always match
    dp[0][0] = true;

    for (let col = 1; col <= COLS; col++) {
        // star patterns can have 0 characters, meaning if the pattern before them matched, it will still match
        if (p[col - 1] === "*") {
            dp[0][col] = dp[0][col - 1] || dp[0][col - 2];
        }
    }

    for (let row = 1; row <= ROWS; row++) {
        for (let col = 1; col <= COLS; col++) {
            // character in word matches character in pattern
            if (s[row - 1] === p[col - 1] || p[col - 1] === ".") {
                dp[row][col] = dp[row - 1][col - 1];
            }
            // characters did not match and pattern character is not a star
            if (p[col - 1] !== "*") {
                continue;
            }

            // current character matches current star pattern
            if (p[col - 2] === "." || s[row - 1] === p[col - 2]) {
                // check if pattern matched before adding current character OR before adding current character and the star pattern
                dp[row][col] = dp[row - 1][col] || dp[row - 1][col - 2];
            }

            // current character might not match current star pattern
            // check if current character matched before the current star pattern (star pattern substring will have 0 characters)
            dp[row][col] ||= dp[row][col - 2];
        }
    }

    return dp[ROWS][COLS];
}

// dfs solution
export function isMatchDfs(s: string, p: string): boolean {
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
