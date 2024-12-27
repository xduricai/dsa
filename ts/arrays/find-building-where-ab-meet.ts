import { Heap } from "../heap/heap";

export function leftmostBuildingQueries(
    heights: number[],
    queries: number[][]
): number[] {
    const output = Array(queries.length).fill(-1);
    const queryMap = new Map<number, [number, number][]>();
    const heap = new Heap<[number, number]>();

    for (let idx = 0; idx < queries.length; idx++) {
        const left = Math.min(queries[idx][0], queries[idx][1]);
        const right = Math.max(queries[idx][0], queries[idx][1]);

        if (left === right || heights[left] < heights[right]) {
            output[idx] = right;
            continue;
        }

        const list = queryMap.get(right);
        const height = Math.max(heights[left], heights[right]);

        if (list) {
            list.push([height, idx]);
        } else {
            queryMap.set(right, [[height, idx]]);
        }
    }

    for (let idx = 0; idx < heights.length; idx++) {
        for (const query of queryMap.get(idx) || []) {
            heap.add(query);
        }

        while (heap.length && heap.peek()[0] < heights[idx]) {
            const [_, qIdx] = heap.delete();
            output[qIdx] = idx;
        }
    }

    return output;
}
