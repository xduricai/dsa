// union find
export function countComponents(n: number, edges: [number, number][]) {
    const rank = Array(n).fill(1);
    const parent = rank.map((_, idx) => idx);

    const find = (node: number) => {
        let res = node;

        while (res != parent[res]) {
            parent[res] = parent[parent[res]]; // path compression
            res = parent[res];
        }
        return res;
    };

    const union = (node1: number, node2: number) => {
        const par1 = find(node1);
        const par2 = find(node2);

        if (par1 === par2) {
            return 0;
        }

        if (rank[par2] > rank[par1]) {
            parent[par1] = par2;
            rank[par2] += rank[par1];
        } else {
            parent[par2] = par1;
            rank[par1] += rank[par2];
        }
        return 1;
    };

    let count = n;
    for (const [node1, node2] of edges) {
        count -= union(node1, node2);
    }
    return count;
}

export function countComponentsDfs(n: number, edges: [number, number][]) {
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

    const dfs = (current: number) => {
        if (seen.has(current)) {
            return;
        }

        seen.add(current);
        const list = adjList.get(current);

        for (const node of list) {
            dfs(node);
        }
    };

    let node = 0;
    let count = 0;

    while (node < n && seen.size < n) {
        if (!seen.has(node)) {
            dfs(node);
            count++;
        }
        node++;
    }
    return count;
}
