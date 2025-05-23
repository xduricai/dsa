// LC 3068 (https://leetcode.com/problems/find-the-maximum-sum-of-node-values)

export function maximumValueSum(
    nums: number[],
    k: number,
    edges: number[][]
): number {
    let positiveMin = Infinity;
    let negativeMax = -Infinity;
    let count = 0;
    let sum = 0;

    for (const node of nums) {
        const xor = node ^ k;
        const delta = xor - node;
        sum += node;

        if (delta > 0) {
            positiveMin = Math.min(positiveMin, delta);
            sum += delta;
            count++;
        } else {
            negativeMax = Math.max(negativeMax, delta);
        }
    }

    if (count % 2 === 0) {
        return sum;
    }
    return Math.max(sum - positiveMin, sum + negativeMax);
}
