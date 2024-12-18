export function isBipartite(graph: number[][]): boolean {
    const nodes = Array(graph.length).fill(0);

    const bfs = (start: number) => {
        if (nodes[start] !== 0) {
            return true;
        }
        const queue = [start];
        nodes[start] = -1;

        while (queue.length) {
            const len = queue.length;

            for (let iter = 0; iter < len; iter++) {
                const node = queue.shift();

                for (const n of graph[node]) {
                    if (nodes[node] === nodes[n]) {
                        return false;
                    }

                    if (nodes[n] === 0) {
                        nodes[n] = -nodes[node];
                        queue.push(n);
                    }
                }
            }
        }

        return true;
    };

    for (let node = 0; node < graph.length; node++) {
        if (!bfs(node)) {
            return false;
        }
    }

    return true;
}
