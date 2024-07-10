class Node {
    key: number;
    value: number;
    previous: Node;
    next: Node;

    constructor (key: number, value: number, previous: Node, next: Node) {
        this.key = key;
        this.value = value;
        this.previous = previous;
        this.next = next;
    }
}

class LRUCache {
    head: Node = null;
    tail: Node = null;
    size: number = 0;
    capacity: number;
    cache = new Map<number, Node>();

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: number): number {
        const node = this.cache.get(key);
        if (!node) return -1;

        this.detach(node);
        this.prepend(node);
        return node.value;        
    }

    put(key: number, value: number): void {
        let node = this.cache.get(key);

        if (node) {
            node.value = value;
            this.detach(node);
        } else {
            node = new Node(key, value, null, null);
            this.cache.set(key, node);
        }
        this.prepend(node);
        if (this.size > this.capacity) this.trimCache();
    }

    private detach(node: Node) {
        this.size--;
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.previous;
        }
        if (node.next) {
            node.next.previous = node.previous;
        }
        if (node.previous) {
            node.previous.next = node.next;
        }
    }

    private prepend(node: Node) {
        this.size++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.previous = null;
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
    }

    private trimCache() {
        this.cache.delete(this.tail.key);
        this.detach(this.tail);
    }
}