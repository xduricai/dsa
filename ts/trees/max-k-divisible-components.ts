export function maxKDivisibleComponents(
    n: number,
    edges: number[][],
    values: number[],
    k: number
): number {
    const adjList = new Map();
    let count = 0;

    for (const [src, dst] of edges) {
        const listA = adjList.get(src);
        const listB = adjList.get(dst);

        listA ? listA.push(dst) : adjList.set(src, [dst]);
        listB ? listB.push(src) : adjList.set(dst, [src]);
    }

    const dfs = (node: number, prev: number) => {
        let sum = values[node];

        for (const child of adjList.get(node) || []) {
            if (child !== prev) {
                sum += dfs(child, node);
            }
        }

        if (sum % k === 0) {
            count++;
        }

        return sum;
    };

    dfs(0, -1);
    return count;
}
