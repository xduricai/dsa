import { TreeNode } from "./tree-node";

export function largestValues(root: TreeNode | null): number[] {
    if (!root) return [];

    const output = [];
    let level = [root];

    while (level.length) {
        let max = -Infinity;
        const nextLevel = [];

        for (const node of level) {
            max = Math.max(max, node.val);

            if (node.left) {
                nextLevel.push(node.left);
            }
            if (node.right) {
                nextLevel.push(node.right);
            }
        }

        output.push(max);
        level = nextLevel;
    }

    return output;
}
