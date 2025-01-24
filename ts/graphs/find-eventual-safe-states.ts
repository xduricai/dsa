// topological sort
export function eventualSafeNodes(graph: number[][]): number[] {
    const safe = new Set<number>();
    const cycle = new Set<number>();
    const res = [];

    const topSort = (node: number) => {
        if (safe.has(node)) {
            return true;
        }
        if (cycle.has(node)) {
            return false;
        }

        cycle.add(node);

        for (const neighbor of graph[node]) {
            if (!topSort(neighbor)) {
                return false;
            }
        }

        cycle.delete(node);
        safe.add(node);
        return true;
    };

    for (let node = 0; node < graph.length; node++) {
        if (topSort(node)) {
            res.push(node);
        }
    }

    return res;
}
