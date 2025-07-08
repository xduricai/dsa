// LC 1752 (https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii)

export function maxValue(events: number[][], k: number): number {
    events.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        if (a[1] !== b[1]) {
            return a[1] - b[1];
        }
        return b[2] - a[2];
    });
    const DP = new Map<string, number>();

    const dfs = (idx: number, count: number) => {
        if (count === k || idx === events.length) {
            return 0;
        }
        const key = `${idx}-${count}`;

        if (DP.has(key)) {
            return DP.get(key);
        }

        const skip = dfs(idx + 1, count);
        let nextIdx = idx;

        while (
            nextIdx < events.length &&
            events[nextIdx][0] <= events[idx][1]
        ) {
            nextIdx++;
        }

        const include = events[idx][2] + dfs(nextIdx, count + 1);
        const res = Math.max(skip, include);
        DP.set(key, res);
        return res;
    };

    return dfs(0, 0);
}
