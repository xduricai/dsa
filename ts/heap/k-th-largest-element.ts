import { Heap } from "./heap";

export function findKthLargest(nums: number[], k: number): number {
    const heap = new Heap<number>();

    for (let num of nums) {
        heap.add(num);
    }
    for (let iter = 0; iter < nums.length - k; iter++) {
        heap.delete();
    }
    
    return heap.peek();
};