import { TreeNode } from "./tree-node";

export function recoverFromPreorder(traversal: string): TreeNode | null {
    // (level, value)[]
    const nodes = getNodes(traversal);
    const root = new TreeNode(nodes.pop()[1]);

    const dfs = (node: TreeNode, level: number) => {
        if (nodes.length && nodes.at(-1)[0] === level + 1) {
            node.left = new TreeNode(nodes.pop()[1]);
            dfs(node.left, level + 1);
        }
        if (nodes.length && nodes.at(-1)[0] === level + 1) {
            node.right = new TreeNode(nodes.pop()[1]);
            dfs(node.right, level + 1);
        }
    };

    dfs(root, 0);
    return root;
}

// parse the sequence of nodes
function getNodes(traversal: string): [number, number][] {
    traversal = `${traversal}-`;
    const nodes = [];
    let dashes = 0;
    let num = "";

    for (const char of traversal) {
        if (char !== "-") {
            num = `${num}${char}`;
        } else if (!num) {
            dashes++;
        } else {
            nodes.push([dashes, parseInt(num)]);
            dashes = 1;
            num = "";
        }
    }

    return nodes.reverse();
}
