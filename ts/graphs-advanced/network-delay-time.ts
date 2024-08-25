import { Heap } from "../heap/heap";

export function networkDelayTime(
    times: number[][],
    n: number,
    k: number
): number {
    const visited = new Set<number>();
    const adjList = new Map<number, [number, number][]>();
    const heap = new Heap<[number, number]>();
    let result = 0;

    for (const [source, destination, cost] of times) {
        const neighbors = adjList.get(source);
        if (neighbors) {
            neighbors.push([cost, destination]);
        } else {
            adjList.set(source, [[cost, destination]]);
        }
    }
    heap.add([0, k]);

    while (heap.length) {
        const [cost, node] = heap.delete();
        if (visited.has(node)) {
            continue;
        }
        visited.add(node);
        result = Math.max(result, cost);

        for (const [neighborCost, neighbor] of adjList.get(node) || []) {
            if (visited.has(neighbor)) {
                continue;
            }
            heap.add([cost + neighborCost, neighbor]);
        }
    }
    return visited.size === n ? result : -1;
}
