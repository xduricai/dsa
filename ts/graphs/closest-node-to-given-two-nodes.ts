// LC 2359 (https://leetcode.com/problems/find-closest-node-to-given-two-nodes)

export function closestMeetingNode(
    edges: number[],
    node1: number,
    node2: number
): number {
    const n = edges.length;

    const dfs = (start: number) => {
        const dist = Array(n).fill(-1);
        let distance = 0;
        let node = start;

        while (dist[node] === -1) {
            dist[node] = distance;
            node = edges[node];
            distance++;
        }

        return dist;
    };

    const distances1 = dfs(node1);
    const distances2 = dfs(node2);
    let minDist = Infinity;
    let res = -1;

    for (let node = 0; node < n; node++) {
        if (distances1[node] === -1 || distances2[node] === -1) {
            continue;
        }
        const max = Math.max(distances1[node], distances2[node]);

        if (max < minDist) {
            minDist = max;
            res = node;
        }
    }

    return res;
}
