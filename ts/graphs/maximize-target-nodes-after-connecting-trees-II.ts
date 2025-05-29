// LC 3373 (https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii)

export function maxTargetNodes(
    edges1: number[][],
    edges2: number[][]
): number[] {
    const adjList1 = getAdjList(edges1);
    const adjList2 = getAdjList(edges2);
    const res = Array(edges1.length + 1).fill(1);
    let max = 0;

    const [colors1, blue1, red1] = colorNodes(adjList1);
    const [_, blue2, red2] = colorNodes(adjList2);
    const add = Math.max(blue2, red2);

    return colors1.map((color) => (color === 0 ? blue1 + add : red1 + add));
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

function colorNodes(
    adjList: Map<number, number[]>
): [number[], number, number] {
    const nodes = Array(adjList.size).fill(-1);
    let blue = 0;
    let red = 0;
    let isBlue = true;
    let queue = [0];

    while (queue.length) {
        const nextQueue = [];

        for (const node of queue) {
            if (nodes[node] !== -1) {
                continue;
            }

            if (isBlue) {
                nodes[node] = 0;
                blue++;
            } else {
                nodes[node] = 1;
                red++;
            }

            for (const nei of adjList.get(node) || []) {
                nextQueue.push(nei);
            }
        }

        queue = nextQueue;
        isBlue = !isBlue;
    }

    return [nodes, blue, red];
}
