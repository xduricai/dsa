class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    const walk = (root: TreeNode | null) => {
        if (root === null || root === p || root === q) return root;

        const left = walk(root.left);
        const right = walk(root.right);

        if (left && right) return root;
        return left || right || null;
    }
    return walk(root);
};

function lowestCommonAncestorAlt(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	if (root === null || root === p || root === q) return root;

    const left = lowestCommonAncestorAlt(root.left, p, q);
    const right = lowestCommonAncestorAlt(root.right, p, q);

    if (!left) return right;
    if (!right) return left;
    return root;
};