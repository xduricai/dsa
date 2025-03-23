// LC 1967 (https://leetcode.com/problems/number-of-ways-to-arrive-at-destination)
import { Heap } from "../heap/custom-heap";

// suboptimal Dijkstra solution
export function countPaths(n: number, roads: number[][]): number {
    const PRIME = 10 ** 9 + 7;
    const minCost = Array(n).fill(Infinity);
    const minWays = Array(n).fill(0);
    const heap = new Heap<[number, number]>((a, b) => a[0] - b[0], [[0, 0]]);
    const adjList: [number, number][][] = Array.from({ length: n }, (_) =>
        Array<[number, number]>()
    );

    for (const [src, dst, cost] of roads) {
        adjList[src].push([dst, cost]);
        adjList[dst].push([src, cost]);
    }
    minWays[0] = 1;

    while (heap.size) {
        const [cost, src] = heap.pop();

        for (const [dst, dstCost] of adjList[src]) {
            const totalCost = cost + dstCost;

            if (totalCost < minCost[dst]) {
                minCost[dst] = totalCost;
                minWays[dst] = minWays[src];
                heap.push([totalCost, dst]);
            } else if (totalCost === minCost[dst]) {
                minWays[dst] += minWays[src];
                minWays[dst] %= PRIME;
            }
        }
    }

    return minWays[n - 1];
}
