import { Heap } from "../heap/heap";

export function minCostConnectPoints(points: number[][]): number {
    const visited = new Set<number[]>();
    const heap = new Heap<[number, number[]]>();
    let cost = 0;
    heap.add([0, points[0]]);

    while (visited.size < points.length) {
        const [dist, node] = heap.delete();
        if (visited.has(node)) {
            continue;
        }

        visited.add(node);
        cost += dist;

        for (const point of points) {
            if (visited.has(point)) {
                continue;
            }
            const distance =
                Math.abs(node[0] - point[0]) + Math.abs(node[1] - point[1]);
            heap.add([distance, point]);
        }
    }
    return cost;
}
