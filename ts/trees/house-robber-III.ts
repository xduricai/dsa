import { TreeNode } from "./tree-node";

function rob(root: TreeNode | null): number {
    return solve(root)[1];
}

function solve(root: TreeNode | null): [number, number] {
    if (!root) {
        return [0, 0];
    }

    const [withoutLeft, withLeft] = solve(root.left);
    const [withoutRight, withRight] = solve(root.right);

    const withoutRoot = withLeft + withRight;
    const withRoot = Math.max(
        withoutRoot,
        withoutLeft + withoutRight + root.val
    );

    return [withoutRoot, withRoot];
}

export function robAlt(root: TreeNode | null): number {
    const dp = new Map<TreeNode, number>();

    const dfs = (node: TreeNode | null) => {
        if (!node) {
            return 0;
        }
        if (dp.has(node)) {
            return dp.get(node);
        }

        const exclude = dfs(node.left) + dfs(node.right);
        let include = node.val;

        if (node.left) {
            include += dfs(node.left.left) + dfs(node.left.right);
        }
        if (node.right) {
            include += dfs(node.right.left) + dfs(node.right.right);
        }

        const res = Math.max(include, exclude);
        dp.set(node, res);

        return res;
    };

    return dfs(root);
}
