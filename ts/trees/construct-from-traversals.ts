import { TreeNode } from "./tree-node";

export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!preorder.length) return null;

    const node = new TreeNode(preorder[0]);
    const mid = inorder.indexOf(preorder[0]);

    node.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    node.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
    return node;
}