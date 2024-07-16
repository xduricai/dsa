import { TreeNode } from "./tree-node";

export function isValidBST(root: TreeNode | null): boolean {
    return walk(root, -Infinity, Infinity);
}

function walk(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;

    return walk(node.left, min, node.val) && walk(node.right, node.val, max);
}