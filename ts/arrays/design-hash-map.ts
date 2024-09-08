class Node {
    key: number;
    value: number;
    next: Node = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

class HashTable {
    map: (Node | null)[];
    size: number;
    capacity: number;

    constructor(capacity = 2) {
        this.map = Array(capacity).fill(null);
        this.size = 0;
        this.capacity = capacity;
    }

    insert(key: number, value: number) {
        const idx = this.getIdx(key);
        let node = this.map[idx];

        while (node) {
            if (node.key === key) {
                node.value = value;
                return;
            }

            if (!node.next) {
                break;
            }
            node = node.next;
        }

        if (!node) {
            this.map[idx] = new Node(key, value);
        } else {
            node.next = new Node(key, value);
        }
        this.size++;

        if (this.size >= Math.floor(this.capacity / 2)) {
            this.resize();
        }
    }

    get(key: number) {
        let node = this.map[this.getIdx(key)];
        while (node) {
            if (node.key === key) {
                return node.value;
            }
            node = node.next;
        }
        return -1;
    }

    remove(key: number) {
        const idx = this.getIdx(key);
        let node = this.map[idx];
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
                this.map[idx] = node.next;
            }
            this.size--;
            return true;
        }
        return false;
    }

    getSize() {
        return this.size;
    }

    getCapacity() {
        return this.map.length;
    }

    resize() {
        const oldMap = this.map;
        this.size = 0;
        this.capacity *= 2;
        this.map = new Array(this.capacity).fill(null);

        for (let node of oldMap) {
            while (node) {
                this.insert(node.key, node.value);
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
