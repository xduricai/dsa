import { TreeNode } from "./tree-node";

export function isBalanced(root: TreeNode | null): boolean {
    return checkSubtree(root) !== false;
};

function checkSubtree(node: TreeNode | null): number | false {
    if (!node) return 0;

    const left = checkSubtree(node.left);
    const right = checkSubtree(node.right);

    if (left === false || right === false) return false;
    if (Math.abs(right - left) > 1) return false;
    return Math.max(left, right) + 1;
}