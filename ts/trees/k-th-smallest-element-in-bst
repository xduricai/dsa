import { TreeNode } from "./tree-node";


export function kthSmallest(root: TreeNode | null, k: number): number {
    const values: number[] = [];

    const walk = (node: TreeNode | null) => {
        if (!node) return;

        walk(node.left);

        if (values.length === k) return;
        values.push(node.val);

        walk(node.right);
    }

    walk(root);
    return values[values.length - 1];
};

export function kthSmallestAlt(root: TreeNode | null, k: number): number {
    let count = 0;

    const walk = (node: TreeNode| null) => {
        if (!node) return null;

        const left = walk(node.left);
        if (left !== null) return left;

        count++;
        console.log(node.val, count, k)
        if (count === k) return node.val;
        return walk(node.right);
    }

    return walk(root);
};