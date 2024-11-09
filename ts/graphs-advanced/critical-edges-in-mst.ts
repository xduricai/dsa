type Edge = {
    src: number;
    dst: number;
    cost: number;
    idx: number;
};

class UnionFind {
    parents: number[];
    ranks: number[];
    size: number;

    constructor(n: number) {
        this.size = n;
        this.parents = Array(n);
        this.ranks = Array(n).fill(1);

        for (let idx = 0; idx < n; idx++) {
            this.parents[idx] = idx;
        }
    }

    find(node: number) {
        let current = node;
        let parent = this.parents[node];

        while (current !== parent) {
            this.parents[current] = this.parents[parent];
            current = this.parents[current];
            parent = this.parents[current];
        }

        return parent;
    }

    union(nodeA: number, nodeB: number) {
        const parentA = this.find(nodeA);
        const parentB = this.find(nodeB);

        if (parentA === parentB) {
            return false;
        }

        this.size--;
        const rankA = this.ranks[parentA];
        const rankB = this.ranks[parentB];

        if (rankA < rankB) {
            this.parents[parentA] = parentB;
            this.ranks[parentB] = rankA + rankB;
        } else {
            this.parents[parentB] = parentA;
            this.ranks[parentA] = rankA + rankB;
        }

        return true;
    }
}

export function findCriticalAndPseudoCriticalEdges(
    n: number,
    edges: number[][]
): number[][] {
    const graph = edges
        .map(([src, dst, cost], idx) => ({ src, dst, cost, idx }))
        .sort((a, b) => a.cost - b.cost);

    const kruskal = (ignore: Edge | null, include: Edge | null) => {
        const uf = new UnionFind(n);
        let cost = 0;

        if (include) {
            uf.union(include.src, include.dst);
            cost += include.cost;
        }

        for (const edge of graph) {
            if (
                edge !== ignore &&
                edge !== include &&
                uf.union(edge.src, edge.dst)
            ) {
                cost += edge.cost;
            }
        }

        return { valid: uf.size === 1, cost };
    };

    const bestCost = kruskal(null, null).cost;
    const critical = [];
    const semiCritical = [];

    for (const edge of graph) {
        let res = kruskal(edge, null);

        if (!res.valid || res.cost > bestCost) {
            critical.push(edge.idx);
            continue;
        }

        res = kruskal(null, edge);

        if (res.cost === bestCost) {
            semiCritical.push(edge.idx);
        }
    }

    return [critical, semiCritical];
}
