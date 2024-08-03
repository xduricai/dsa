import { TreeNode } from "./tree-node";

export function rightSideView(root: TreeNode | null): number[] {
    const ret = [];
    const queue = [root];

    while (queue.length) {
        let count = queue.length;
        let right = null;

        while (count) {
            count--;
            const node = queue.shift();
            if (!node) continue;

            right = node;
            queue.push(node.left, node.right);
        }
        if (right) ret.push(right.val);
    }
    return ret;
}
