import { TreeNode } from "./tree-node";

// iterative
export function postorderTraversal(root: TreeNode | null): number[] {
    const output = [];
    const stack = [root];
    const visit = [false];

    while (stack.length) {
        const node = stack.pop();
        const visited = visit.pop();

        if (!node) {
            continue;
        }
        if (visited) {
            output.push(node.val);
            continue;
        }

        stack.push(node, node.right, node.left);
        visit.push(true, false, false);
    }
    return output;
}

// iterative
export function postorderTraversalAlt(root: TreeNode | null): number[] {
    const output = [];
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();

        if (!node) {
            continue;
        }

        output.unshift(node.val);
        stack.push(node.left, node.right);
    }
    return output;
}
