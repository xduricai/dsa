import { TreeNode } from "./tree-node";

// recursive DFS
export function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));   
};

// iterative DFS
export function maxDepth2(root: TreeNode | null): number {
    if (!root) return 0;
    const stack = [{ node: root, depth: 1 }];
    let max = 1;

    while (stack.length) {
        const { node, depth } = stack.pop();
        max = Math.max(max, depth);

        if (node.left) stack.push({ node: node.left, depth: depth + 1 });
        if (node.right) stack.push({ node: node.right, depth: depth + 1 });
    }
    return max;
};

// iterative BFS
export function maxDepth3(root: TreeNode | null): number {
    const queue = [{ node: root, depth: 1 }];
    let max = 0;

    while (queue.length) {
        const { node, depth } = queue.shift();
        if (!node) continue;

        max = depth;
        queue.push({ node: node.left, depth: depth + 1 });
        queue.push({ node: node.right, depth: depth + 1 });
    }
    return max;
};

// iterative BFS
export function maxDepth4(root: TreeNode | null): number {
    if (!root) return 0;
    const queue = [root];
    let depth = 0;

    while (queue.length) {
        depth++;
        const count = queue.length;
        
        for (let iter = 0; iter < count; iter++) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return depth;
};