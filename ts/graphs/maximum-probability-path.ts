import { Heap } from "../heap/heap";

type Edge = {
    dst: number;
    prob: number;
};

export function maxProbability(
    n: number,
    edges: number[][],
    succProb: number[],
    start_node: number,
    end_node: number
): number {
    const adjList = new Map<number, Edge[]>();

    for (let idx = 0; idx < edges.length; idx++) {
        const [src, dst] = edges[idx];
        const edgeA = { dst: dst, prob: succProb[idx] };
        const edgeB = { dst: src, prob: succProb[idx] };

        const listA = adjList.get(src);
        const listB = adjList.get(dst);

        listA ? listA.push(edgeA) : adjList.set(src, [edgeA]);
        listB ? listB.push(edgeB) : adjList.set(dst, [edgeB]);
    }

    const seen = new Set<number>();
    const heap = new Heap<[number, number]>();
    heap.add([-1, start_node]);

    while (heap.length) {
        const [probability, node] = heap.delete();

        if (node === end_node || probability === 0) {
            return -probability;
        }

        if (seen.has(node)) {
            continue;
        }
        seen.add(node);

        for (const edge of adjList.get(node) || []) {
            if (seen.has(edge.dst)) {
                continue;
            }
            heap.add([probability * edge.prob, edge.dst]);
        }
    }
    return 0;
}
