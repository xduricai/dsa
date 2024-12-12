import { Heap } from "../heap/heap";

export function pickGifts(gifts: number[], k: number): number {
    const heap = new Heap<[number, number]>();

    for (let idx = 0; idx < gifts.length; idx++) {
        heap.add([-gifts[idx], idx]);
    }

    for (let second = 0; second < k; second++) {
        let [amount, idx] = heap.delete();

        const root = Math.floor(Math.sqrt(-amount));
        gifts[idx] = root;
        heap.add([-root, idx]);
    }

    return gifts.reduce((acc, curr) => acc + curr, 0);
}
