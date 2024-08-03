class _Node {
    val: number;
    neighbors: _Node[];

    constructor(val = 0, neighbors = []) {
        this.val = val;
        this.neighbors = neighbors;
    }
}

export function cloneGraph(node: _Node | null): _Node | null {
    if (!node) return null;
    const nodeMap = new Map<_Node, _Node>();

    const dfs = (root: _Node) => {
        let copy = nodeMap.get(root);
        if (copy) return copy;

        copy = new _Node(root.val);
        nodeMap.set(root, copy);

        for (let child of root.neighbors) {
            copy.neighbors.push(dfs(child));
        }
        return copy;
    };
    return dfs(node);
}

export function cloneGraphAlt(node: _Node | null): _Node | null {
    if (!node) return null;

    const nodeMap = new Map<_Node, _Node>();
    const root = new _Node(node.val, []);

    const dfs = (og: _Node, copy: _Node) => {
        nodeMap.set(og, copy);

        for (let child of og.neighbors) {
            let childCopy = nodeMap.get(child);

            if (!childCopy) {
                childCopy = new _Node(child.val, []);
                dfs(child, childCopy);
            }
            copy.neighbors.push(childCopy);
        }
    };
    dfs(node, root);
    return root;
}
