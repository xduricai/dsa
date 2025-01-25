export function buildMatrix(
    k: number,
    rowConditions: number[][],
    colConditions: number[][]
): number[][] {
    const rowOrder = sort(k, rowConditions);
    // row order isn't valid
    if (!rowOrder.length) {
        return [];
    }

    const colOrder = sort(k, colConditions);
    // col order isn't valid
    if (!colOrder.length) {
        return [];
    }

    const output = Array.from({ length: k }, () => Array(k).fill(0));
    const colMap = Array(k);

    // map values onto their respective columns
    for (let idx = 0; idx < k; idx++) {
        const value = colOrder[idx];
        colMap[value] = idx;
    }

    // insert values into their respective positions in the grid
    for (let row = 0; row < k; row++) {
        const value = rowOrder[row];
        const col = colMap[value];
        output[row][col] = value;
    }

    return output;
}

// topological sort
function sort(k: number, edges: number[][]): number[] {
    const graph = new Map<number, number[]>();
    const visited = new Set<number>();
    const cycle = new Set<number>();
    const res = [];

    for (const [src, dst] of edges) {
        const list = graph.get(src);

        if (list) {
            list.push(dst);
        } else {
            graph.set(src, [dst]);
        }
    }

    const topSort = (node: number) => {
        if (visited.has(node)) {
            return true;
        }
        if (cycle.has(node)) {
            return false;
        }
        cycle.add(node);

        for (const neighbor of graph.get(node) || []) {
            if (!topSort(neighbor)) {
                return false;
            }
        }

        cycle.delete(node);
        visited.add(node);
        res.push(node);
        return true;
    };

    for (let node = 1; node <= k; node++) {
        if (!topSort(node)) {
            return [];
        }
    }
    return res.reverse();
}
