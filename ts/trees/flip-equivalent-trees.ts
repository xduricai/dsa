import { TreeNode } from "./tree-node";

export function flipEquiv(
    root1: TreeNode | null,
    root2: TreeNode | null
): boolean {
    if (!root1 && !root2) {
        return true;
    }

    if (root1?.val !== root2?.val) {
        return false;
    }

    return (
        (flipEquiv(root1.left, root2.left) &&
            flipEquiv(root1.right, root2.right)) ||
        (flipEquiv(root1.right, root2.left) &&
            flipEquiv(root1.left, root2.right))
    );
}
