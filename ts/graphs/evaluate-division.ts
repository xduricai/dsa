// adjacency list + BFS solution
export function calcEquation(
    equations: string[][],
    values: number[],
    queries: string[][]
): number[] {
    const n = equations.length;
    const adjList = new Map<string, [string, number][]>();

    for (let idx = 0; idx < n; idx++) {
        const [left, right] = equations[idx];
        const listL = adjList.get(left);
        const listR = adjList.get(right);

        if (listL) {
            listL.push([right, values[idx]]);
        } else {
            adjList.set(left, [[right, values[idx]]]);
        }

        if (listR) {
            listR.push([left, 1 / values[idx]]);
        } else {
            adjList.set(right, [[left, 1 / values[idx]]]);
        }
    }

    const bfs = (src: string, tgt: string) => {
        if (!adjList.has(src) || !adjList.has(tgt)) {
            return -1;
        }

        const seen = new Set<string>();
        let queue: [string, number][] = [[src, 1]];

        while (queue.length) {
            const nextQueue = [];

            for (const [num, res] of queue) {
                if (num === tgt) {
                    return res;
                }
                if (seen.has(num)) {
                    continue;
                }
                seen.add(num);

                for (const pair of adjList.get(num) || []) {
                    nextQueue.push([pair[0], pair[1] * res]);
                }
            }
            queue = nextQueue;
        }

        return -1;
    };

    return queries.map(([left, right]) => bfs(left, right));
}
