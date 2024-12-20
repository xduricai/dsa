import { TreeNode } from "./tree-node";

export function reverseOddLevels(root: TreeNode | null): TreeNode | null {
    let queue = [root];
    let isOdd = false;

    while (queue.length) {
        if (!queue[0]) {
            break;
        }

        const children = queue.flatMap((node) => [node.left, node.right]);
        const values = queue.map((node) => node.val);
        const len = queue.length;

        if (isOdd) {
            for (let idx = 0; idx < len; idx++) {
                queue[idx].val = values[len - 1 - idx];
            }
        }

        queue = children;
        isOdd = !isOdd;
    }

    return root;
}
