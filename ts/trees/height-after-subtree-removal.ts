import { TreeNode } from "./tree-node";

export function treeQueries(
    root: TreeNode | null,
    queries: number[]
): number[] {
    const results = new Map<number, number>();
    const heights = new Map<TreeNode, number>();

    const height = (node: TreeNode | null) => {
        if (!node) {
            return -1;
        }

        if (heights.has(node)) {
            return heights.get(node);
        }

        const h = 1 + Math.max(height(node.left), height(node.right));
        heights.set(node, h);
        return h;
    };

    const dfs = (node: TreeNode | null, depth: number, max: number) => {
        if (!node) {
            return;
        }

        results.set(node.val, max);
        dfs(
            node.left,
            depth + 1,
            Math.max(max, depth + 1 + height(node.right))
        );
        dfs(
            node.right,
            depth + 1,
            Math.max(max, depth + 1 + height(node.left))
        );
    };

    dfs(root, 0, 0);
    return queries.map((query) => results.get(query));
}
