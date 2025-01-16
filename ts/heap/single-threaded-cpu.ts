import { Heap } from "./custom-heap";

// enqueue time, processing time, index
type Task = [number, number, number];

function compareStart(a: Task, b: Task) {
    return a[0] - b[0];
}

function compareDuration(a: Task, b: Task) {
    if (a[1] === b[1]) {
        return a[2] - b[2];
    }
    return a[1] - b[1];
}

export function getOrder(tasks: number[][]): number[] {
    const tasksMapped = tasks.map(
        ([enqueueTime, duration], idx) => [enqueueTime, duration, idx] as Task
    );
    const queue = new Heap<Task>(compareStart, tasksMapped);
    const heap = new Heap<Task>(compareDuration);
    const res = [];
    let time = 0;

    while (queue.size || heap.size) {
        while (queue.size && queue.peek()[0] <= time) {
            heap.push(queue.pop());
        }

        if (!heap.size) {
            time = queue.peek()[0];
            continue;
        }

        const [enqueueTime, duration, idx] = heap.pop();
        time += duration;
        res.push(idx);
    }

    return res;
}
