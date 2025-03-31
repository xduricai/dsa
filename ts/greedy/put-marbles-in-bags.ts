// LC 2551 (https://leetcode.com/problems/put-marbles-in-bags)

export function putMarbles(weights: number[], k: number): number {
    const splits = [];
    let min = 0;
    let max = 0;

    for (let idx = 1; idx < weights.length; idx++) {
        splits.push(weights[idx] + weights[idx - 1]);
    }
    splits.sort((a, b) => b - a);

    for (let idx = 0; idx < k - 1; idx++) {
        max += splits[idx];
        min += splits[splits.length - idx - 1];
    }

    return max - min;
}
