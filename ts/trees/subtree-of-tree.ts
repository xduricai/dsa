import { isSameTree } from "./same-tree";
import { TreeNode } from "./tree-node";

export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (!subRoot) return true;
    if (!root) return false;

    const same = root.val === subRoot.val && isSameTree(root, subRoot);
    return same 
        || isSubtree(root.left, subRoot)
        || isSubtree(root.right, subRoot); 
};