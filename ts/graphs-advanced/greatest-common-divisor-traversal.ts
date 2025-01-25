// prime factorization
export function canTraverseAllPairs(nums: number[]): boolean {
    const n = nums.length;
    const uf = new UnionFind(n);
    // map prime factors onto indices
    const factorIndex = new Map<number, number>();

    for (let idx = 0; idx < n; idx++) {
        let num = nums[idx];

        // find all prime factors of the number
        for (let factor = 2; factor * factor <= num; factor++) {
            if (num % factor !== 0) {
                continue;
            }

            if (factorIndex.has(factor)) {
                uf.union(idx, factorIndex.get(factor));
            } else {
                factorIndex.set(factor, idx);
            }

            while (num % factor === 0) {
                num /= factor;
            }
        }

        // remainder can also be a prime factor
        if (num > 1) {
            if (factorIndex.has(num)) {
                uf.union(idx, factorIndex.get(num));
            } else {
                factorIndex.set(num, idx);
            }
        }
    }

    return uf.size === 1;
}

class UnionFind {
    parents: number[];
    ranks: number[];
    size: number;

    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, idx) => idx);
        this.ranks = Array(n).fill(1);
        this.size = n;
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

        const rankA = this.ranks[parentA];
        const rankB = this.ranks[parentB];

        if (rankA > rankB) {
            this.parents[parentB] = parentA;
            this.ranks[parentA] += rankB;
        } else {
            this.parents[parentA] = parentB;
            this.ranks[parentB] += rankA;
        }

        this.size--;
        return true;
    }
}
