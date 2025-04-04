// LC 1123 (https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves)
import { TreeNode } from "./tree-node";

// deepest leaves = every single leaf with a depth of n, where n is the depth of the lowest node
export function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
    return dfs(root)[1];
}

function dfs(root: TreeNode | null): [number, TreeNode | null] {
    if (!root) {
        return [0, null];
    }

    const [depthLeft, nodeLeft] = dfs(root.left);
    const [depthRight, nodeRight] = dfs(root.right);

    if (depthLeft > depthRight) {
        return [depthLeft + 1, nodeLeft];
    }
    if (depthRight > depthLeft) {
        return [depthRight + 1, nodeRight];
    }

    return [depthLeft + 1, root];
}
