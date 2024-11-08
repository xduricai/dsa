import { UnionFind } from "../trees/design-disjoint-set";

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

    if (uf.numComponents !== 1) {
        return -1;
    }
    return total;
}
