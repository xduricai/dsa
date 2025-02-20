// optimal solution
export function findDifferentBinaryString(nums: string[]): string {
    return nums.map((str, idx) => (str[idx] === "1" ? "0" : "1")).join("");
}

// Binary tree solution
export function findDifferentBinaryStringAlt(nums: string[]): string {
    const root = new Node();
    const res = [];

    for (const str of nums) {
        let current = root;

        for (const bit of str) {
            if (bit === "0") {
                if (!current.left) {
                    current.left = new Node();
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = new Node();
                }
                current = current.right;
            }
        }
    }

    const backtrack = (node?: Node) => {
        if (!node) {
            while (res.length < nums.length) {
                res.push("1");
            }
            return true;
        }

        if (res.length === nums.length) {
            return false;
        }

        res.push("0");
        if (backtrack(node.left)) {
            return true;
        }
        res.pop();

        res.push("1");
        if (backtrack(node.right)) {
            return true;
        }
        res.pop();
    };

    backtrack(root);
    return res.join("");
}

class Node {
    left?: Node;
    right?: Node;
}
