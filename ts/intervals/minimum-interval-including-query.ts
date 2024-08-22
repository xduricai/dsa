import { Heap } from "../heap/heap";

export function minInterval(
    intervals: number[][],
    queries: number[]
): number[] {
    intervals.sort((a, b) => a[0] - b[0]);
    const results = new Map<number, number>();
    const heap = new Heap<[number, number]>();
    const sortedQueries = [...queries].sort((a, b) => a - b);
    let idx = 0;

    for (const query of sortedQueries) {
        // add every interval that starts early enough to contain the query
        while (idx < intervals.length && intervals[idx][0] <= query) {
            const [left, right] = intervals[idx];
            heap.add([right - left + 1, right]);
            idx++;
        }

        // remove all intervals that end before query
        while (heap.length && heap.peek()[1] < query) {
            heap.delete();
        }

        if (heap.length) {
            results.set(query, heap.peek()[0]);
        } else {
            results.set(query, -1);
        }
    }
    return queries.map((q) => results.get(q));
}
