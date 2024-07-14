import { TreeNode } from "./tree-node";

export function levelOrder(root: TreeNode | null): number[][] {
    const ret = [];
    const queue = [root];

    while (queue.length) {
        const level = [];
        let count = queue.length;

        while (count) {
            count--;
            const node = queue.shift();
            if (!node) continue;

            level.push(node.val);
            queue.push(node.left, node.right);
        }
        if (level.length) ret.push(level);
    }
    return ret;
}