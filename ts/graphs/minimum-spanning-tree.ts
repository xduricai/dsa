import { Heap } from "../heap/heap";

// Prim's algorithm
export function minimumSpanningTree(
    n: number,
    edges: [number, number, number][]
) {
    const adjList = new Map<number, [number, number][]>();
    const heap = new Heap<[number, number]>();
    const seen = new Set<number>();
    let totalCost = 0;

    for (const [src, dst, cost] of edges) {
        const listA = adjList.get(src);
        const listB = adjList.get(dst);

        if (listA) {
            listA.push([dst, cost]);
        } else {
            adjList.set(src, [[dst, cost]]);
        }

        if (listB) {
            listB.push([src, cost]);
        } else {
            adjList.set(dst, [[src, cost]]);
        }
    }

    heap.add([0, edges[0][0]]);

    while (heap.length) {
        const [cost, node] = heap.delete();

        if (seen.has(node)) {
            continue;
        }
        seen.add(node);
        totalCost += cost;

        for (const [dst, dstCost] of adjList.get(node) || []) {
            if (!seen.has(dst)) {
                heap.add([dstCost, dst]);
            }
        }
    }

    if (seen.size !== n) {
        return -1;
    }
    return totalCost;
}
