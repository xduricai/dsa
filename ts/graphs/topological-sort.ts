export function topologicalSort(n: number, edges: number[][]): number[] {
    const adjList = new Map<number, number[]>();

    for (const [src, dst] of edges) {
        const list = adjList.get(src);

        if (list) {
            list.push(dst);
        } else {
            adjList.set(src, [dst]);
        }
    }

    const output = [];
    const seen = new Set<number>();
    const cycle = new Set<number>();

    const dfs = (node: number) => {
        if (seen.has(node)) {
            return true;
        }
        if (cycle.has(node)) {
            return false;
        }

        cycle.add(node);

        for (const neighbor of adjList.get(node) || []) {
            if (!dfs(neighbor)) {
                return false;
            }
        }

        cycle.delete(node);
        seen.add(node);
        output.push(node);

        return true;
    };

    for (let src = 0; src < n; src++) {
        if (!dfs(src)) {
            return [];
        }
    }

    return output.reverse();
}
