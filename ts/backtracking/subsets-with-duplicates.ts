export function subsetsWithDup(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const output = [];
    const current = [];

    const backtrack = (idx: number) => {
        if (idx === nums.length) {
            output.push([...current]);
            return;
        }

        current.push(nums[idx]);
        backtrack(idx + 1);
        current.pop();

        while (idx + 1 < nums.length && nums[idx] === nums[idx + 1]) {
            idx++;
        }
        backtrack(idx + 1);
    };
    backtrack(0);
    return output;
}
