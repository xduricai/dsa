export function arithmeticTriplets(nums: number[], diff: number): number {
    const numSet = new Set();
    let count = 0;

    for (const num of nums) {
        numSet.add(num);

        if (numSet.has(num - diff) && numSet.has(num - diff - diff)) {
            count++;
        }
    }
    return count;
}
