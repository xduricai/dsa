export function findRedundantConnection(edges: number[][]): number[] {
    const rank = Array(edges.length + 1).fill(1);
    const parent = rank.map((_, idx) => idx);

    const find = (node: number) => {
        let res = node;

        while (parent[res] !== res) {
            parent[res] = parent[parent[res]];
            res = parent[res];
        }
        return res;
    };

    const union = (node1: number, node2: number) => {
        const parent1 = find(node1);
        const parent2 = find(node2);

        if (parent1 === parent2) {
            return false;
        }

        if (rank[parent1] > rank[parent2]) {
            parent[parent2] = parent1;
            rank[parent1] += rank[parent2];
        } else {
            parent[parent1] = parent2;
            rank[parent2] += rank[parent1];
        }
        return true;
    };

    for (const [node1, node2] of edges) {
        if (!union(node1, node2)) {
            return [node1, node2];
        }
    }
}
