import { Heap } from "./heap";

export class MedianFinder {
    smallHeap = new Heap<number>();
    bigHeap = new Heap<number>();

    addNum(num: number): void {
        if (num >= this.bigHeap.peek()) {
            this.bigHeap.add(num);
        } else {
            this.smallHeap.add(-num);
        }

        if (this.smallHeap.length > this.bigHeap.length + 1) {
            const value = this.smallHeap.delete();
            this.bigHeap.add(-value);
        } else if (this.bigHeap.length > this.smallHeap.length + 1) {
            const value = this.bigHeap.delete();
            this.smallHeap.add(-value);
        }
    }

    findMedian(): number {
        if (!this.smallHeap.length && !this.bigHeap.length) {
            return undefined;
        }
        if (this.smallHeap.length > this.bigHeap.length) {
            return -this.smallHeap.peek();
        }
        if (this.smallHeap.length < this.bigHeap.length) {
            return this.bigHeap.peek();
        }
        return (-this.smallHeap.peek() + this.bigHeap.peek()) / 2;
    }
}