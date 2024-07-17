export function subsets(nums: number[]): number[][] {
    const output = [];
    const current = [];

    const dfs = (idx) => {
        if (idx >= nums.length) {
            output.push([...current]);
            return;
        }

        current.push(nums[idx]);
        dfs(idx + 1);
        current.pop();
        dfs(idx + 1);
    }
    dfs(0);
    return output;
}