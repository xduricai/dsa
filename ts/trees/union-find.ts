export class UnionFind<T> {
    parents = new Map<T, T>();
    ranks = new Map<T, number>();
    size: number;

    constructor(elements: T[]) {
        for (const el of elements) {
            this.parents.set(el, el);
            this.ranks.set(el, 1);
        }
        this.size = elements.length;
    }

    find(node: T) {
        let current = node;
        let parent = this.parents.get(node);

        while (current !== parent) {
            this.parents.set(current, this.parents.get(parent));
            current = this.parents.get(current);
            parent = this.parents.get(current);
        }
        return current;
    }

    union(nodeA: T, nodeB: T) {
        const parentA = this.find(nodeA);
        const parentB = this.find(nodeB);

        if (parentA === parentB) {
            return false;
        }

        const rankA = this.ranks.get(parentA);
        const rankB = this.ranks.get(parentB);

        if (rankA > rankB) {
            this.parents.set(parentB, parentA);
            this.ranks.set(parentA, rankA + rankB);
        } else {
            this.parents.set(parentA, parentB);
            this.ranks.set(parentB, rankB + rankA);
        }
        this.size--;
        return true;
    }
}
