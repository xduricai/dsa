import { TreeNode } from "./tree-node";

export function diameterOfBinaryTree(root: TreeNode | null): number {
    let max = 0;

    const walk = (node: TreeNode | null) => {
        if (!node) return 0;
        const left = walk(node.left);
        const right = walk(node.right);
        
        max = Math.max(max, left + right);
        return Math.max(left, right) + 1;
    }
    
    walk(root);
    return max;
};