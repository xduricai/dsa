export function magnificentSets(n: number, edges: number[][]): number {
    const graph = new Map<number, number[]>();
    const visited = new Array(n).fill(false);
    let res = 0;

    // create an adjacency list
    for (const [src, dst] of edges) {
        const listA = graph.get(src);
        const listB = graph.get(dst);

        listA ? listA.push(dst) : graph.set(src, [dst]);
        listB ? listB.push(src) : graph.set(dst, [src]);
    }

    // iterate over all nodes
    for (let node = 1; node <= n; node++) {
        // skip already explored nodes
        if (visited[node]) {
            continue;
        }

        // maximum number of groups we can make out of the current connected component
        let componentMax = 0;
        // get the connected component
        const component = getConnectedComponent(graph, node, n);

        // check each possible starting point for BFS, add highest group size to result
        for (const el of component) {
            visited[el] = true;
            const componentRes = countGroups(graph, el, n);

            // component is not bipartite
            if (componentRes === -1) {
                return -1;
            }
            componentMax = Math.max(componentMax, componentRes);
        }

        res += componentMax;
    }

    return res;
}

// return an array of nodes that compose a connected component
function getConnectedComponent(
    graph: Map<number, number[]>,
    start: number,
    n: number
) {
    const seen = Array(n).fill(false);
    const res = [];

    const dfs = (node: number) => {
        if (seen[node]) {
            return;
        }
        seen[node] = true;
        res.push(node);

        for (const nei of graph.get(node) || []) {
            dfs(nei);
        }
    };

    dfs(start);
    return res;
}

// count the number of groups in a given connected component using BFS
// also checks whether the connected component is bipartite
function countGroups(graph: Map<number, number[]>, start: number, n: number) {
    // 0 = unvisited node
    // 1, -1 = different node polarities
    const nodes = Array(n).fill(0);
    let queue = [[start, 1, 1]];
    // size refers to the length of the longest path in the group
    let size = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const [node, color, dist] of queue) {
            if (nodes[node] === color) {
                continue;
            }
            // if neighboring nodes have the same polarity, graph is not bipartite
            // this means we cannot construct a valid group
            if (nodes[node] === -color) {
                return -1;
            }
            nodes[node] = color;
            size = dist;

            for (const nei of graph.get(node) || []) {
                nextQueue.push([nei, -color, dist + 1]);
            }
        }
        queue = nextQueue;
    }
    return size;
}
