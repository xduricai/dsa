export function minimumSpanningTree(
    n: number,
    edges: [number, number, number][]
) {
    edges.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n);
    let total = 0;

    for (const [src, dst, cost] of edges) {
        if (uf.find(src) === uf.find(dst)) {
            continue;
        }

        uf.union(src, dst);
        total += cost;
    }

    if (uf.size !== 1) {
        return -1;
    }
    return total;
}

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
