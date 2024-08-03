import { TreeNode } from "./tree-node";

export function maxPathSum(root: TreeNode | null): number {
    let max = -Infinity;

    const walk = (node: TreeNode | null): number => {
        if (!node) return 0;

        const left = walk(node.left);
        const right = walk(node.right);
        let nodeMax = node.val;

        if (left > 0) nodeMax += left;
        if (right > 0) nodeMax += right;
        max = Math.max(nodeMax, max);
        return node.val + Math.max(left, right, 0);
    };
    walk(root);
    return max;
}
