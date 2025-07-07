// LC 1353 (https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended)
import { Heap } from "./custom-heap";

export function maxEvents(events: number[][]): number {
    events.sort((a, b) => a[0] - b[0]);
    const heap = new Heap<number>((a, b) => a - b);
    let count = 0;
    let day = 1;
    let idx = 0;

    while (idx < events.length || heap.size) {
        while (heap.size && heap.peek() < day) {
            heap.pop();
        }

        while (idx < events.length && events[idx][0] <= day) {
            heap.push(events[idx][1]);
            idx++;
        }

        if (heap.size && heap.peek() >= day) {
            heap.pop();
            count++;
        }

        day++;
    }

    return count;
}
