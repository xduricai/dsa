import { TreeNode } from "./tree-node";

function kthLargestLevelSum(root: TreeNode | null, k: number): number {
    const sums = new Map<number, number>();

    const updateSums = (node: TreeNode | null, level: number) => {
        if (!node) {
            return;
        }

        sums.set(level, (sums.get(level) || 0) + node.val);
        updateSums(node.left, level + 1);
        updateSums(node.right, level + 1);
    };
    updateSums(root, 0);

    if (sums.size < k) {
        return -1;
    }

    const sorted = [...sums.values()].sort((a, b) => b - a);
    return sorted[k - 1];
}
