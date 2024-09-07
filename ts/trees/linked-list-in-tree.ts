import { ListNode } from "../linked-lists/list-node";
import { TreeNode } from "./tree-node";

export function isSubPath(
    head: ListNode | null,
    root: TreeNode | null
): boolean {
    const queue = [root];

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const node = queue.shift();

            if (compare(head, node)) {
                return true;
            }
            if (node) {
                queue.push(node.left, node.right);
            }
        }
    }
    return false;
}

function compare(head: ListNode | null, root: TreeNode | null): boolean {
    if (!head) {
        return true;
    }
    if (!root || head.val !== root.val) {
        return false;
    }
    return compare(head.next, root.left) || compare(head.next, root.right);
}
