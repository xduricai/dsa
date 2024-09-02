import { TreeNode } from "../trees/tree-node";

export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    return dfs(root, targetSum, 0);
}

function dfs(
    root: TreeNode | null,
    targetSum: number,
    currentSum: number
): boolean {
    if (!root) {
        return false;
    }
    currentSum += root.val;

    if (!root.left && !root.right) {
        return targetSum === currentSum;
    }

    return (
        dfs(root.left, targetSum, currentSum) ||
        dfs(root.right, targetSum, currentSum)
    );
}
