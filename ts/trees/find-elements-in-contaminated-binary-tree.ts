import { TreeNode } from "./tree-node";

export class FindElements {
    nums = new Set<number>();

    constructor(root: TreeNode | null) {
        root.val = 0;
        this.dfs(root);
    }

    find(target: number): boolean {
        return this.nums.has(target);
    }

    dfs(node: TreeNode) {
        this.nums.add(node.val);

        if (node.left) {
            node.left.val = node.val + node.val + 1;
            this.dfs(node.left);
        }

        if (node.right) {
            node.right.val = node.val + node.val + 2;
            this.dfs(node.right);
        }
    }
}
