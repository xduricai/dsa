export function mostProfitablePath(
    edges: number[][],
    bob: number,
    amount: number[]
): number {
    const tree = new Map<number, number[]>();

    for (const [src, dst] of edges) {
        const srcList = tree.get(src);
        const dstList = tree.get(dst);
        srcList ? srcList.push(dst) : tree.set(src, [dst]);
        dstList ? dstList.push(src) : tree.set(dst, [src]);
    }

    // find the path bob will take
    const bobPath = getBobPath(tree, bob);
    // middle index of bob's path
    const middle = (bobPath.length - 1) / 2;

    const dfs = (curr: number, prev: number, distance: number) => {
        let profit = 0;
        let maxPath = -Infinity; // infinity because paths can be negative

        // add profit for current node if its in the first half of bob's path or outside of it completely
        if (distance < middle || curr !== bobPath[distance]) {
            profit += amount[curr];
        } else if (distance === middle && bobPath[distance] === curr) {
            profit += amount[curr] / 2;
        }

        // run dfs for neighboring nodes
        for (const node of tree.get(curr)) {
            if (node !== prev) {
                maxPath = Math.max(maxPath, dfs(node, curr, distance + 1));
            }
        }

        // if this isn't a leaf node, add the max path profit to the current profit
        if (maxPath !== -Infinity) {
            profit += maxPath;
        }
        return profit;
    };

    return dfs(0, -1, 0);
}

function getBobPath(tree: Map<number, number[]>, start: number) {
    const res = [];

    const dfs = (curr: number, prev: number) => {
        if (curr === 0) {
            res.push(0);
            return true;
        }

        for (const node of tree.get(curr)) {
            if (node !== prev && dfs(node, curr)) {
                res.push(curr);
                return true;
            }
        }

        return false;
    };

    dfs(start, -1);
    return res;
}
