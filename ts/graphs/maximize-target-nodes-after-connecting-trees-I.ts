// LC 3372 (https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i)

export function maxTargetNodes(
    edges1: number[][],
    edges2: number[][],
    k: number
): number[] {
    const adjList1 = getAdjList(edges1);
    const adjList2 = getAdjList(edges2);
    const res = Array(edges1.length + 1).fill(1);
    let max = 0;

    for (let node = 0; node <= edges2.length; node++) {
        const targets = getTargets(adjList2, node, k - 1);
        max = Math.max(max, targets);
    }

    for (let node = 0; node < res.length; node++) {
        res[node] = getTargets(adjList1, node, k) + max;
    }

    return res;
}

function getAdjList(edges: number[][]): Map<number, number[]> {
    const adjList = new Map<number, number[]>();

    for (const [src, dst] of edges) {
        const srcList = adjList.get(src);
        const dstList = adjList.get(dst);

        srcList ? srcList.push(dst) : adjList.set(src, [dst]);
        dstList ? dstList.push(src) : adjList.set(dst, [src]);
    }

    return adjList;
}

function getTargets(
    adjList: Map<number, number[]>,
    start: number,
    k: number
): number {
    const seen = new Set<number>();
    let res = 0;
    let distance = 0;
    let queue = [start];

    while (distance <= k) {
        const nextQueue = [];

        for (const node of queue) {
            if (seen.has(node)) {
                continue;
            }
            seen.add(node);
            res++;

            for (const nei of adjList.get(node) || []) {
                nextQueue.push(nei);
            }
        }

        queue = nextQueue;
        distance++;
    }

    return res;
}
