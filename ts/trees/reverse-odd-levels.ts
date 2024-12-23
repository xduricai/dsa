import { TreeNode } from "./tree-node";

export function reverseOddLevels(root: TreeNode | null): TreeNode | null {
    if (root?.left) {
        reverse(root.left, root.right, true);
    }
    return root;
}

function reverse(left: TreeNode, right: TreeNode, isOdd: boolean) {
    if (isOdd) {
        [left.val, right.val] = [right.val, left.val];
    }

    if (left?.left) {
        reverse(left.left, right.right, !isOdd);
        reverse(left.right, right.left, !isOdd);
    }
}

export function reverseOddLevelsAlt(root: TreeNode | null): TreeNode | null {
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
