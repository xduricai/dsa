import { Heap } from "../heap/heap";

export function shortestPath(
    n: number,
    edges: [number, number, number][],
    src: number
) {
    const output: number[] = Array(n).fill(-1);
    const adjList = new Map<number, [number, number][]>();
    const heap = new Heap<[number, number]>();
    heap.add([0, src]);

    for (let idx = 0; idx < edges.length; idx++) {
        const [src, dst, cost] = edges[idx];
        const list = adjList.get(src);

        if (list) {
            list.push([dst, cost]);
        } else {
            adjList.set(src, [[dst, cost]]);
        }
    }

    while (heap.length) {
        const [cost, node] = heap.delete();

        if (output[node] > -1) {
            continue;
        }
        output[node] = cost;

        for (const [dst, dstCost] of adjList.get(node) || []) {
            if (output[dst] > -1) {
                continue;
            }
            heap.add([cost + dstCost, dst]);
        }
    }
    return output;
}
