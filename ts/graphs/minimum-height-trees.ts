export function findMinHeightTrees(n: number, edges: number[][]): number[] {
    const adjList = Array.from({ length: n }, () => new Set<number>());
    // number of unexplored nodes
    let size = n;

    // create an adjacency list
    for (const [src, dst] of edges) {
        adjList[src].add(dst);
        adjList[dst].add(src);
    }

    let leaves = [];

    // add all leaves to the queue
    for (let node = 0; node < n; node++) {
        if (adjList[node].size < 2) {
            leaves.push(node);
        }
    }

    // keep removing leaf nodes until 1 or 2 nodes are left
    while (size > 2) {
        const nextLeaves = [];

        for (const leaf of leaves) {
            for (const node of adjList[leaf]) {
                adjList[node].delete(leaf);
                size--;

                // if the parent becomes a leaf after node removal, add it to the queue
                if (adjList[node].size === 1) {
                    nextLeaves.push(node);
                }
            }
        }
        leaves = nextLeaves;
    }

    // return the last 1-2 nodes
    return leaves;
}

export function findMinHeightTreesAlt(n: number, edges: number[][]): number[] {
    const adjList = new Map<number, number[]>();
    const indegree = Array(n);
    let leaves = [];
    let target = 2;

    for (let node = 0; node < n; node++) {
        adjList.set(node, []);
    }
    for (const [src, dst] of edges) {
        adjList.get(src).push(dst);
        adjList.get(dst).push(src);
    }

    for (const [node, edges] of adjList) {
        indegree[node] = edges.length;

        if (edges.length === 1) {
            leaves.push(node);
        }
    }

    while (leaves.length && adjList.size > 2) {
        const nextLeaves = [];

        for (const leaf of leaves) {
            for (const node of adjList.get(leaf)) {
                indegree[node]--;

                if (indegree[node] === 1) {
                    nextLeaves.push(node);
                }
            }
            adjList.delete(leaf);
        }
        leaves = nextLeaves;
    }

    return Array.from(adjList.keys());
}
