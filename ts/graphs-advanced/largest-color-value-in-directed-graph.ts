// LC 1857 (https://leetcode.com/problems/largest-color-value-in-a-directed-graph)

export function largestPathValue(colors: string, edges: number[][]): number {
    const getColor = (node: number) =>
        colors[node].charCodeAt(0) - "a".charCodeAt(0);
    const adjList = new Map<number, number[]>();
    const seen = new Set<number>();
    const cycle = new Set<number>();
    let max = 0;
    let n = 0;

    for (const [src, dst] of edges) {
        const list = adjList.get(src);

        if (list) {
            list.push(dst);
        } else {
            adjList.set(src, [dst]);
        }
        n = Math.max(n, src, dst);
    }

    const cache = Array.from({ length: n + 1 }, () => Array(26).fill(0));

    const topSort = (node: number) => {
        if (cycle.has(node)) {
            return null;
        }
        if (seen.has(node)) {
            return true;
        }

        const counter = cache[node];
        const color = getColor(node);
        cycle.add(node);

        for (const nei of adjList.get(node) || []) {
            if (!topSort(nei)) {
                return false;
            }
            for (let idx = 0; idx < 26; idx++) {
                counter[idx] = Math.max(counter[idx], cache[nei][idx]);
            }
        }

        counter[color]++;
        cycle.delete(node);
        seen.add(node);

        return true;
    };

    for (let node = 0; node <= n; node++) {
        if (!topSort(node)) {
            return -1;
        }
        max = Math.max(max, ...cache[node]);
    }

    return max;
}
