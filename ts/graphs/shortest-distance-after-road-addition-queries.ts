export function shortestDistanceAfterQueries(
    n: number,
    queries: number[][]
): number[] {
    const adjList = new Map<number, number[]>();
    const output = [];

    for (let idx = 0; idx < n - 1; idx++) {
        adjList.set(idx, [idx + 1]);
    }

    for (const [src, dst] of queries) {
        const edges = adjList.get(src);
        edges.push(dst);
        output.push(bfs(n - 1, adjList));
    }

    return output;
}

function bfs(target: number, adjList: Map<number, number[]>) {
    const seen = new Set<number>();
    const queue = [0];
    let distance = 0;

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const src = queue.shift();

            if (src === target) {
                return distance;
            }

            if (seen.has(src)) {
                continue;
            }

            seen.add(src);

            for (const dst of adjList.get(src)) {
                queue.push(dst);
            }
        }
        distance++;
    }

    return -1;
}
