import { TreeNode } from "./tree-node";

export function verticalTraversal(root: TreeNode | null): number[][] {
    const queue: [TreeNode, number][] = [[root, 0]];
    const columns = new Map<number, number[]>();
    let min = Infinity;
    let max = -Infinity;

    while (queue.length) {
        const len = queue.length;
        const levelMap = new Map<number, number[]>();

        for (let iter = 0; iter < len; iter++) {
            const [node, col] = queue.shift();
            if (!node) {
                continue;
            }

            min = Math.min(min, col);
            max = Math.max(max, col);
            const levelColumn = levelMap.get(col);

            if (levelColumn) {
                levelColumn.push(node.val);
            } else {
                levelMap.set(col, [node.val]);
            }

            queue.push([node.left, col - 1], [node.right, col + 1]);
        }

        for (const [col, values] of levelMap.entries()) {
            values.sort((a, b) => a - b);
            const column = columns.get(col) || [];

            columns.set(col, column.concat(values));
        }
    }

    const output = [];
    for (let col = min; col <= max; col++) {
        const column = columns.get(col);

        if (column) {
            output.push(column);
        }
    }

    return output;
}
