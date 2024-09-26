export class MyCalendar {
    tree = new BST();

    book(start: number, end: number): boolean {
        return this.tree.insert(start, end);
    }
}

class Node {
    start: number;
    end: number;
    left?: Node;
    right?: Node;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}

class BST {
    root?: Node;

    insert(start: number, end: number) {
        if (!this.root) {
            this.root = new Node(start, end);
            return true;
        }
        let current = this.root;

        while (true) {
            if (end <= current.start) {
                if (!current.left) {
                    current.left = new Node(start, end);
                    return true;
                }
                current = current.left;
            } else if (start >= current.end) {
                if (!current.right) {
                    current.right = new Node(start, end);
                    return true;
                }
                current = current.right;
            } else {
                return false;
            }
        }
    }
}
