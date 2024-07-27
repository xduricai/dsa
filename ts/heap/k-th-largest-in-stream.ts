import { Heap } from "./heap";

export class KthLargest {
    heap: Heap;
    k: number;
    
    constructor(k: number, nums: number[]) {
        this.heap = new Heap();
        this.k = k;

        for (let num of nums) {
            this.heap.add(num);
            if (this.heap.length > k) {
                this.heap.delete();
            }
        }
    }

    add(val: number): number {
        this.heap.add(val);

        while (this.heap.length > this.k) {
            this.heap.delete();
        }
        return this.heap.peek();
    }
}