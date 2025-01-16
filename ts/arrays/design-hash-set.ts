class Node {
    key: number;
    next: Node = null;

    constructor(key: number) {
        this.key = key;
    }
}

export class MyHashSet {
    set: (Node | null)[] = [null, null];
    size = 0;
    capacity = 2;

    add(key: number): void {
        const idx = this.getIdx(key);
        let node = this.set[idx];

        while (node) {
            if (node.key === key) {
                return;
            }

            if (!node.next) {
                break;
            }
            node = node.next;
        }

        if (!node) {
            this.set[idx] = new Node(key);
        } else {
            node.next = new Node(key);
        }
        this.size++;

        if (this.size >= Math.floor(this.capacity / 2)) {
            this.resize();
        }
    }

    remove(key: number): void {
        const idx = this.getIdx(key);
        let node = this.set[idx];
        let prev = null;

        while (node) {
            if (node.key !== key) {
                prev = node;
                node = node.next;
                continue;
            }

            if (prev) {
                prev.next = node.next;
            } else {
                this.set[idx] = node.next;
            }
            this.size--;
            break;
        }
    }

    contains(key: number): boolean {
        let node = this.set[this.getIdx(key)];

        while (node) {
            if (node.key === key) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    resize() {
        const oldSet = this.set;
        this.size = 0;
        this.capacity *= 2;
        this.set = new Array(this.capacity).fill(null);

        for (let node of oldSet) {
            while (node) {
                this.add(node.key);
                node = node.next;
            }
        }
    }

    getIdx(key: number) {
        const str = key.toString();
        let idx = 0;

        for (const char of str) {
            idx += char.charCodeAt(0);
        }
        return idx % this.capacity;
    }
}
