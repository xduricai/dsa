// LC 3375 (https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k)

export function minOperations(nums: number[], k: number): number {
    const numSet = new Set<number>();

    for (const num of nums) {
        if (num < k) {
            return -1;
        }
        if (num > k) {
            numSet.add(num);
        }
    }
    return numSet.size;
}

export function minOperationsAlt(nums: number[], k: number): number {
    const numSet = new Set(nums);
    const sorted = [...numSet].sort((a, b) => a - b);
    let res = 0;

    if (sorted[0] < k) {
        return -1;
    }

    while (sorted.at(-1) > k) {
        sorted.pop();
        res++;
    }
    return res;
}
