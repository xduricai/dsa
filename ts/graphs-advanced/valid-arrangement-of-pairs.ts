export function validArrangement(pairs: number[][]): number[][] {
    const indegree = new Map<number, number>();
    const adjList = new Map<number, number[]>();
    let start = pairs[0][0];

    // count indegree for each node and save edges to adjacency list
    for (const [start, end] of pairs) {
        const inCount = indegree.get(end) || 0;
        indegree.set(end, inCount + 1);

        const edges = adjList.get(start);
        edges ? edges.push(end) : adjList.set(start, [end]);
    }

    // find the start for our path
    for (const node of adjList.keys()) {
        const inCount = indegree.get(node) || 0;
        const outCount = adjList.get(node)?.length || 0;

        if (outCount - inCount === 1) {
            start = node;
        }
    }

    // using shift/unshift yields significantly better memory but significantly worse runtime
    const dfs = (src: number, path: number[]) => {
        const nodes = adjList.get(src) || [];

        // theoretically better to refetch nodes array every time and break if it's null/empty instead of modifying it while recursing
        while (nodes.length) {
            const dst = nodes.pop();
            dfs(dst, path);
        }

        path.push(src);
        return path;
    };

    const path = dfs(start, []).reverse();
    const res = [];

    for (let idx = 0; idx < path.length - 1; idx++) {
        res.push([path[idx], path[idx + 1]]);
    }
    return res;
}

// DFS brute force solution = too slow
export function validArrangementAlt(pairs: number[][]): number[][] {
    const pairMap = new Map<number, number[]>();
    const visited = new Set<number>();

    for (let idx = 0; idx < pairs.length; idx++) {
        const [start, _] = pairs[idx];
        const list = pairMap.get(start);

        if (list) {
            list.push(idx);
        } else {
            pairMap.set(start, [idx]);
        }
    }

    const dfs = (sequence: number[]) => {
        if (sequence.length === pairs.length) {
            return sequence;
        }

        const lastPairIdx = sequence[sequence.length - 1];
        const seqEnd = pairs[lastPairIdx][1];
        visited.add(lastPairIdx);

        for (const pair of pairMap.get(seqEnd) || []) {
            if (visited.has(pair)) {
                continue;
            }

            sequence.push(pair);
            const res = dfs(sequence);

            if (res.length === pairs.length) {
                return res;
            }
            sequence.pop();
        }

        visited.delete(lastPairIdx);
        return sequence;
    };

    for (let idx = 0; idx < pairs.length; idx++) {
        const res = dfs([idx]);

        if (res.length === pairs.length) {
            return res.map((idx) => pairs[idx]);
        }
    }

    return [];
}
