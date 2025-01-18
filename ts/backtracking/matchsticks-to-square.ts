export function makesquare(matchsticks: number[]): boolean {
    const sum = matchsticks.reduce((acc, curr) => acc + curr, 0);
    const target = sum / 4;
    const current = [0, 0, 0, 0];

    // 4 equal sides cannot be constructed
    if (sum % 4 !== 0) {
        return false;
    }
    // sort in descending order to avoid trying pointless combinations \
    matchsticks.sort((a, b) => b - a);

    // helper function to check if the current side is identical to one we've already checked
    const isDuplicate = (side: number) => {
        for (let idx = 0; idx < side; idx++) {
            if (current[idx] === current[side]) {
                return true;
            }
        }
        return false;
    };

    const dfs = (idx: number) => {
        if (idx === matchsticks.length) {
            return true;
        }

        for (let side = 0; side < 4; side++) {
            // side would be too long if we added the matchstick to it
            if (current[side] + matchsticks[idx] > target) {
                continue;
            }

            // we've already ran dfs for a side of the same size
            if (isDuplicate(side)) {
                continue;
            }

            current[side] += matchsticks[idx];
            if (dfs(idx + 1)) {
                return true;
            }
            current[side] -= matchsticks[idx];
        }

        return false;
    };

    return dfs(0);
}
