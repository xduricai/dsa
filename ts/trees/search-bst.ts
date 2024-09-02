import { TreeNode } from "./tree-node";

export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root || root.val === val) return root;
    if (root.val > val) return searchBST(root.left, val);
    else return searchBST(root.right, val);
}
