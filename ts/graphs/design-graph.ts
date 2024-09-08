export class Graph {
    graph = new Map<number, Set<number>>();

    addEdge(src: number, dst: number) {
        const neighbors = this.graph.get(src);
        if (neighbors) {
            neighbors.add(dst);
        } else {
            this.graph.set(src, new Set([dst]));
        }
    }

    removeEdge(src: number, dst: number) {
        const neighbors = this.graph.get(src);

        if (!neighbors || !neighbors.has(dst)) {
            return false;
        }

        neighbors.delete(dst);
        return true;
    }

    hasPath(src: number, dst: number) {
        const visited = new Set();
        const queue = [src];

        while (queue.length) {
            const node = queue.shift();
            if (visited.has(node)) {
                continue;
            }

            const neighbors = this.graph.get(node);
            if (!neighbors) {
                continue;
            }

            if (neighbors.has(dst)) {
                return true;
            }

            for (const value of neighbors.values()) {
                queue.push(value);
            }
        }
        return false;
    }
}
