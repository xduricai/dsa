export function subsets(nums: number[]): number[][] {
    const output = [];
    const current = [];

    const backtrack = (idx: number) => {
        if (idx >= nums.length) {
            output.push([...current]);
            return;
        }

        current.push(nums[idx]);
        backtrack(idx + 1);
        current.pop();
        backtrack(idx + 1);
    };
    backtrack(0);
    return output;
}
