import { TreeNode } from "./tree-node";

export class BSTIterator {
    stack: (TreeNode | null)[] = [];
    current: TreeNode | null;

    constructor(root: TreeNode | null) {
        this.current = root;
    }

    next(): number {
        while (this.current) {
            this.stack.push(this.current);
            this.current = this.current.left;
        }

        while (!this.current) {
            this.current = this.stack.pop();
        }

        const val = this.current.val;
        this.current = this.current.right;
        return val;
    }

    hasNext(): boolean {
        return !!this.current || this.stack.length > 0;
    }
}
