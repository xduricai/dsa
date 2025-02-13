import { Heap } from "./custom-heap";

export function minOperations(nums: number[], k: number): number {
    const heap = new Heap<number>((a, b) => a - b, nums);
    let operations = 0;

    while (heap.size > 1 && heap.peek() < k) {
        const next = heap.pop() * 2 + heap.pop();
        heap.push(next);
        operations++;
    }

    return operations;
}
