export function combinationSum2(
    candidates: number[],
    target: number
): number[][] {
    candidates.sort((a, b) => a - b);
    const output: number[][] = [];
    const current: number[] = [];

    const backtrack = (start: number, sum: number) => {
        if (sum === target) {
            output.push([...current]);
            return;
        }
        if (sum > target || start >= candidates.length) {
            return;
        }

        let previous = null;
        for (let idx = start; idx < candidates.length; idx++) {
            if (candidates[idx] === previous) continue;

            current.push(candidates[idx]);
            backtrack(idx + 1, sum + candidates[idx]);
            current.pop();

            previous = candidates[idx];
        }
    };
    backtrack(0, 0);
    return output;
}

export function combinationSum2Alt(
    candidates: number[],
    target: number
): number[][] {
    candidates.sort((a, b) => a - b);
    const output = [];
    const current = [];

    const backtrack = (idx: number, sum: number) => {
        if (sum === target) {
            output.push([...current]);
            return;
        }

        if (sum > target || idx >= candidates.length) {
            return;
        }

        current.push(candidates[idx]);
        backtrack(idx + 1, sum + candidates[idx]);
        current.pop();

        while (
            idx + 1 < candidates.length &&
            candidates[idx] === candidates[idx + 1]
        ) {
            idx++;
        }
        backtrack(idx + 1, sum);
    };
    backtrack(0, 0);
    return output;
}
