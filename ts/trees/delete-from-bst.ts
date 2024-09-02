import { TreeNode } from "./tree-node";

export function deleteNode(
    root: TreeNode | null,
    key: number
): TreeNode | null {
    if (!root) {
        return null;
    }
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (!root.left) {
            return root.right;
        }
        if (!root.right) {
            return root.left;
        }

        root.val = findMinChild(root.right);
        root.right = deleteNode(root.right, root.val);
    }
    return root;
}

function findMinChild(root: TreeNode): number {
    while (root.left) {
        root = root.left;
    }
    return root.val;
}
