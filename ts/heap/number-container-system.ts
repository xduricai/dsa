import { Heap } from "./custom-heap";

export class NumberContainers {
    // maps indices to numbers that occupy them
    numMap = new Map<number, number>();
    // maps numbers onto heaps of indices that they occupy
    indexHeaps = new Map<number, Heap<number>>();

    change(index: number, number: number): void {
        // create a heap for this number if it does not yet exist
        if (!this.indexHeaps.has(number)) {
            this.indexHeaps.set(number, new Heap((a, b) => a - b));
        }

        // add the index to the corresponding heap
        const heap = this.indexHeaps.get(number);
        heap.push(index);
        // update the index
        this.numMap.set(index, number);
    }

    find(number: number): number {
        // this number has not been added yet
        if (!this.indexHeaps.has(number)) {
            return -1;
        }

        const heap = this.indexHeaps.get(number);
        // remove all indices this number no longer occupies
        while (heap.size && number !== this.numMap.get(heap.peek())) {
            heap.pop();
        }

        // no indices remain for this number
        if (!heap.size) {
            return -1;
        }
        // return the lowest index
        return heap.peek();
    }
}
