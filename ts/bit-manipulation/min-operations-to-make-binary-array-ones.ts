export function minOperations(nums: number[]): number {
    let res = 0;

    for (let idx = 0; idx < nums.length - 2; idx++) {
        if (!nums[idx]) {
            nums[idx] ^= 1;
            nums[idx + 1] ^= 1;
            nums[idx + 2] ^= 1;
            res++;
        }
    }

    if (!nums.at(-1) || !nums.at(-2)) {
        return -1;
    }
    return res;
}
