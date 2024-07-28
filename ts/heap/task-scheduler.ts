import { Heap } from "./heap";

export function leastInterval(tasks: string[], n: number): number {
    const a = "A".charCodeAt(0);
    const counts = Array(26).fill(0);
    const heap = new Heap<number>();
    const queue = [];
    let time = 0;

    for (let task of tasks) {
        const idx = task.charCodeAt(0) - a;
        counts[idx]--;
    }

    for (let num of counts.filter(c => c < 0)) {
        heap.add(-num);
    }

    while (heap.length || queue.length) {
        time++;
        
        if (heap.length) {
            const count = heap.delete() + 1;
            if (count) {
                queue.push([count, time + n]);
            }
        }

        if (queue.length && queue[0][1] === time) {
            heap.add(queue.shift()[0]);
        }
    }
    return time;
};