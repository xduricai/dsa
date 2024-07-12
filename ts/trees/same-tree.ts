import { TreeNode } from "./tree-node";

export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!q && !p) return true;
    if (q?.val !== p?.val) return false;

    return isSameTree(p?.left, q?.left) && isSameTree(p?.right, q?.right);
};