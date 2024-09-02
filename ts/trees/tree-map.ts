class TreeNode {
    key: number;
    value: number;
    left: TreeNode = null;
    right: TreeNode = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

export class TreeMap {
    root: TreeNode = null;

    insert(key: number, val: number) {
        if (!this.root) {
            this.root = new TreeNode(key, val);
            return;
        }
        let current = this.root;

        while (true) {
            if (current.key === key) {
                current.value = val;
                return;
            }

            if (key < current.key) {
                if (!current.left) {
                    current.left = new TreeNode(key, val);
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = new TreeNode(key, val);
                    return;
                }
                current = current.right;
            }
        }
    }

    get(key: number) {
        let current = this.root;

        while (current) {
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                return current.value;
            }
        }
        return -1;
    }

    getMin() {
        if (!this.root) {
            return -1;
        }
        let current = this.root;

        while (current.left) {
            current = current.left;
        }
        return current.value;
    }

    getMax() {
        if (!this.root) {
            return -1;
        }
        let current = this.root;

        while (current.right) {
            current = current.right;
        }
        return current.value;
    }

    remove(key: number) {
        this.root = this.removeNode(this.root, key);
    }

    private removeNode(root: TreeNode | null, key: number) {
        if (!root) {
            return null;
        }
        if (key < root.key) {
            root.left = this.removeNode(root.left, key);
        } else if (key > root.key) {
            root.right = this.removeNode(root.right, key);
        } else {
            if (!root.left) {
                return root.right;
            }
            if (!root.right) {
                return root.left;
            }

            let min = root.right;
            while (min.left) {
                min = min.left;
            }

            root.key = min.key;
            root.value = min.value;
            root.right = this.removeNode(root.right, min.key);
        }
        return root;
    }

    getInorderKeys() {
        return this.inorderTraversal(this.root, []);
    }

    private inorderTraversal(root: TreeNode | null, output: number[]) {
        if (!root) {
            return output;
        }
        this.inorderTraversal(root.left, output);
        output.push(root.key);
        this.inorderTraversal(root.right, output);

        return output;
    }
}
