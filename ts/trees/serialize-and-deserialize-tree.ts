import { TreeNode } from "./tree-node";

export function serialize(root: TreeNode | null): string {
    const output = [];
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();

        if (!node) {
            output.push(NaN);
            continue;
        }
        output.push(node.val);
        queue.push(node.left, node.right);
    }
    return output.join(",");
}

export function deserialize(data: string): TreeNode | null {
    const values = data.split(",").map((val) => parseInt(val));
    const rootVal = values.shift();
    if (isNaN(rootVal)) return null;

    const root = new TreeNode(rootVal);
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();
        const left = values.shift();
        const right = values.shift();

        if (!isNaN(left)) {
            node.left = new TreeNode(left);
            queue.push(node.left);
        } else {
            node.left = null;
        }

        if (!isNaN(right)) {
            node.right = new TreeNode(right);
            queue.push(node.right);
        } else {
            node.right = null;
        }
    }
    return root;
}
