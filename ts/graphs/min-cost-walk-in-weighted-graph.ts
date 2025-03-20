// LC 3108 (https://leetcode.com/problems/minimum-cost-walk-in-weighted-graph)
export function minimumCost(n: number, edges: number[][], query: number[][]): number[] {
    const uf = new UnionFind(n);
    const groups = Array(n).fill(-1);
    const costs = Array(n).fill(-1);
    const res: number[] = [];

    for (const [src, dst, _] of edges) {
        uf.union(src, dst);
    }

    for (const [src, dst, cost] of edges) {
        const group = uf.find(src);
        groups[src] = group;
        groups[dst] = group;

        if (costs[group] !== -1) {
            costs[group] &= cost;
        } else {
            costs[group] = cost;
        }
    }

    for (const [src, dst] of query) {
        if (groups[src] === groups[dst] && groups[src] !== -1) {
            res.push(costs[groups[src]]);
        } else {
            res.push(-1);
        }
    }

    return res;
};

class UnionFind {
    parents: number[];
    ranks: number[];
    count: number;
    
    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, idx) => idx);
        this.ranks = Array(n).fill(1);
        this.count = n;
    }

    find(node: number): number {
        let curr = node;
        let parent = this.parents[node];

        while (curr !== parent) {
            this.parents[curr] = this.parents[parent];
            curr = this.parents[curr];
            parent = this.parents[curr];
        }

        return parent;
    }

    union(nodeA: number, nodeB: number): boolean {
        const parentA = this.find(nodeA);
        const parentB = this.find(nodeB);

        if (parentA === parentB) {
            return false;
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

        this.count--;
        return true;
    }
}