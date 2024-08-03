export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

// utility function for level order non-formatted print
export function print(root: TreeNode | null) {
    if (!root) return;
    const queue = [root];
    let out = "";

    while (queue.length) {
        let count = queue.length;

        while (count) {
            count--;
            const node = queue.shift();
            out = `${out} ${node?.val.toString() || "N"}`;
            if (node) {
                queue.push(node.left, node.right);
            }
        }
        out = `${out}\n`;
    }
    console.log(out);
}
