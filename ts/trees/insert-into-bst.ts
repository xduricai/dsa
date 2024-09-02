import { TreeNode } from "./tree-node";

export function insertIntoBST(
    root: TreeNode | null,
    val: number
): TreeNode | null {
    if (!root) {
        return new TreeNode(val);
    }

    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    return root;
}
