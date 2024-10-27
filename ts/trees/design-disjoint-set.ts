export class UnionFind {
    parents: Map<number, number>;
    sizes: Map<number, number>;
    numComponents: number;

    constructor(n: number) {
        this.parents = new Map<number, number>();
        this.sizes = new Map<number, number>();
        this.numComponents = n;

        for (let idx = 0; idx < n; idx++) {
            this.parents.set(idx, idx);
            this.sizes.set(idx, 1);
        }
    }

    find(x: number) {
        let current = x;
        let parent = this.parents.get(x);

        while (current !== parent) {
            this.parents.set(current, this.parents.get(parent));
            current = this.parents.get(current);
            parent = this.parents.get(current);
        }
        return current;
    }

    isSameComponent(x: number, y: number) {
        return this.find(x) === this.find(y);
    }

    union(x: number, y: number) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        const sizeX = this.sizes.get(rootX);
        const sizeY = this.sizes.get(rootY);

        if (rootX === rootY) {
            return false;
        }

        if (sizeX > sizeY) {
            this.parents.set(rootY, rootX);
            this.sizes.set(rootX, sizeX + sizeY);
        } else {
            this.parents.set(rootX, rootY);
            this.sizes.set(rootY, sizeY + sizeX);
        }
        this.numComponents--;
        return true;
    }

    getNumComponents() {
        return this.numComponents;
    }
}
