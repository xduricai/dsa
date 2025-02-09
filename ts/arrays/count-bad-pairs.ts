export function countBadPairs(nums: number[]): number {
    // count the number of seen numbers with a given offset between their value and their index
    const offsets = new Map<number, number>();
    let res = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        const offset = nums[idx] - idx;
        const count = offsets.get(offset) || 0;
        offsets.set(offset, count + 1);

        // every previously seen number with a different offset forms a bad pair
        res += idx - count;
    }

    return res;
}
