import { Heap } from "./heap";

export function findMaximizedCapital(
    k: number,
    w: number,
    profits: number[],
    capital: number[]
): number {
    // min heap by capital required
    const capitalHeap = new Heap<[number, number]>();
    // max heap by profit acquired
    const profitHeap = new Heap<[number, number]>();

    for (let idx = 0; idx < profits.length; idx++) {
        capitalHeap.add([capital[idx], profits[idx]]);
    }

    for (let iter = 0; iter < k; iter++) {
        while (capitalHeap.length && capitalHeap.peek()[0] <= w) {
            const [capital, profit] = capitalHeap.delete();
            // negative profit to simulate max heap
            profitHeap.add([-profit, capital]);
        }

        if (!profitHeap.length) {
            return w;
        }

        // subtract profit since it is a negative number
        const [profit, _] = profitHeap.delete();
        w -= profit;
    }

    return w;
}
