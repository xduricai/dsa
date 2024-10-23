import { TreeNode } from "./tree-node";

export function replaceValueInTree(root: TreeNode | null): TreeNode | null {
    const queue: [TreeNode | null, TreeNode | null][] = [[root, null]];

    while (queue.length) {
        const len = queue.length;
        let levelSum = 0;

        for (const [left, right] of queue) {
            levelSum += (left?.val || 0) + (right?.val || 0);
        }

        for (let iter = 0; iter < len; iter++) {
            const [left, right] = queue.shift();
            const siblingSum = (left?.val || 0) + (right?.val || 0);

            if (left) {
                left.val = levelSum - siblingSum;
                queue.push([left.left, left.right]);
            }
            if (right) {
                right.val = levelSum - siblingSum;
                queue.push([right.left, right.right]);
            }
        }
    }

    return root;
}
