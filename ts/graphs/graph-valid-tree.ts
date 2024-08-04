export function validTree(n: number, edges: [number, number][]) {
    const init = [];
    for (let node = 0; node < n; node++) {
        init.push([node, []]);
    }

    const adjList = new Map<number, number[]>(init);
    const seen = new Set<number>();

    for (const [node1, node2] of edges) {
        const list1 = adjList.get(node1);
        const list2 = adjList.get(node2);
        list1.push(node2);
        list2.push(node1);
    }

    const dfs = (current: number, previous: number) => {
        if (seen.has(current)) {
            return false;
        }

        seen.add(current);
        const list = adjList.get(current);

        for (let node of list) {
            if (node === previous) {
                continue;
            }
            if (!dfs(node, current)) {
                return false;
            }
        }
        return true;
    };

    if (!dfs(0, -1)) {
        return false;
    }
    return seen.size === n;
}
