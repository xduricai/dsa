import { TreeNode } from "./tree-node";

// iterative
export function preorderTraversal(root: TreeNode | null): number[] {
    const output = [];
    const stack = [];
    let current = root;

    while (current || stack.length) {
        if (!current) {
            current = stack.pop();
            continue;
        }

        output.push(current.val);
        stack.push(current.right);
        current = current.left;
    }
    return output;
}

// iterative
export function preorderTraversalAlt(root: TreeNode | null): number[] {
    const output = [];
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();

        if (!node) {
            continue;
        }

        output.push(node.val);
        stack.push(node.right, node.left);
    }
    return output;
}
