// LC 2685 (https://leetcode.com/problems/count-the-number-of-complete-components)
export function countCompleteComponents(n: number, edges: number[][]): number {
    const uf = new UnionFind(n);
    const edgeCounts = Array(n).fill(0);
    let res = 0;

    for (const [src, dst] of edges) {
        uf.union(src, dst);
    }

    for (const [src, _] of edges) {
        const group = uf.find(src);
        edgeCounts[group]++;
    }

    for (let group = 0; group < n; group++) {
        if (uf.parents[group] !== group) {
            continue;
        }

        const maxEdges = (uf.ranks[group] * (uf.ranks[group] - 1)) / 2;
        if (edgeCounts[group] === maxEdges) {
            res++;
        }
    }

    return res;
}

export function countCompleteComponentsAlt(
    n: number,
    edges: number[][]
): number {
    const uf = new UnionFind(n);
    const groupSizes = Array(n).fill(0);
    const edgeCounts = Array(n).fill(0);
    let res = 0;

    for (const [src, dst] of edges) {
        uf.union(src, dst);
    }

    for (const [src, dst] of edges) {
        const group = uf.find(src);
        edgeCounts[group]++;
    }

    for (let node = 0; node < n; node++) {
        const group = uf.find(node);
        groupSizes[group]++;
    }

    for (let group = 0; group < n; group++) {
        const maxEdges = (groupSizes[group] * (groupSizes[group] - 1)) / 2;

        if (groupSizes[group] && edgeCounts[group] === maxEdges) {
            res++;
        }
    }

    return res;
}

class UnionFind {
    parents: number[];
    ranks: number[];

    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, idx) => idx);
        this.ranks = Array(n).fill(1);
    }

    find(node: number) {
        let curr = this.parents[node];
        let parent = this.parents[curr];

        while (curr !== parent) {
            this.parents[curr] = this.parents[parent];
            curr = this.parents[curr];
            parent = this.parents[curr];
        }

        return parent;
    }

    union(nodeA: number, nodeB: number) {
        const parentA = this.find(nodeA);
        const parentB = this.find(nodeB);

        if (parentA === parentB) {
            return;
        }

        const rankA = this.ranks[parentA];
        const rankB = this.ranks[parentB];

        if (rankA > rankB) {
            this.parents[parentB] = parentA;
            this.ranks[parentA] += rankB;
        } else {
            this.parents[parentA] = parentB;
            this.ranks[parentB] += rankA;
        }
    }
}
