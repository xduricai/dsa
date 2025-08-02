// LC 2561 (https://leetcode.com/problems/rearranging-fruits)

export function minCost(basket1: number[], basket2: number[]): number {
    const counter = new Map<number, [number, number]>();
    const swaps = [];
    let min = Infinity;
    let res = 0;

    for (const fruit of basket1) {
        const counts = counter.get(fruit);
        counts ? counts[0]++ : counter.set(fruit, [1, 0]);
        min = Math.min(min, fruit);
    }

    for (const fruit of basket2) {
        const counts = counter.get(fruit);
        counts ? counts[1]++ : counter.set(fruit, [0, 1]);
        min = Math.min(min, fruit);
    }

    for (const [fruit, [count1, count2]] of counter) {
        if (count1 + (count2 % 2) === 1) {
            return -1;
        }
        const swapCount = Math.abs(count1 - count2) / 2;

        for (let count = 0; count < swapCount; count++) {
            swaps.push(fruit);
        }
    }

    swaps.sort((a, b) => a - b);
    const len = swaps.length / 2;
    const minCost = min * 2;
    // we can reduce the cost of a swap by swapping the cheapest element and then swapping it back

    for (let idx = 0; idx < len; idx++) {
        res += Math.min(swaps[idx], minCost);
    }

    return res;
}
