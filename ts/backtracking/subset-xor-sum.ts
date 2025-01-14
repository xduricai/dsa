// optimal solution
export function subsetXORSum(nums: number[]): number {
    let res = 0;

    for (const num of nums) {
        res |= num;
    }

    return res << (nums.length - 1);
}

// backtracking solution
export function subsetXORSumAlt(nums: number[]): number {
    let res = 0;
    let xor = 0;

    const backtrack = (idx: number) => {
        if (idx === nums.length) {
            res += xor;
            return;
        }
        backtrack(idx + 1);

        xor ^= nums[idx];
        backtrack(idx + 1);
        xor ^= nums[idx];
    };

    backtrack(0);
    return res;
}
