export function combinationSum(candidates: number[], target: number): number[][] {
    const output = [];
    const current = [];

    const dfs = (start: number, sum: number) => {
        if (sum > target) return;
        if (sum === target) {
            output.push([...current]);
            return;
        }

        for (let idx = start; idx < candidates.length; idx++) {
            current.push(candidates[idx]);
            dfs(idx, sum + candidates[idx]);
            current.pop();
        }
    }
    dfs(0, 0);
    return output;
}