import { TreeNode } from "./tree-node";

export function goodNodes(root: TreeNode | null): number {
    return walk(root, -Infinity);
}

function walk(node: TreeNode | null, max: number): number {
    if (!node) return 0;

    let ret = node.val >= max ? 1 : 0;
    ret += walk(node.left, Math.max(max, node.val));
    ret += walk(node.right, Math.max(max, node.val));

    return ret;
}
