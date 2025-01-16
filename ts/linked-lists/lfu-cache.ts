class ListNode {
    key: number;
    next?: ListNode;
    prev?: ListNode;

    constructor(key: number, prev: ListNode = undefined) {
        this.key = key;
        this.prev = prev;
    }
}

class LinkedList {
    head?: ListNode;
    tail?: ListNode;
    lookup: Map<number, ListNode>;

    constructor(key: number) {
        this.head = new ListNode(key);
        this.tail = this.head;
        this.lookup = new Map([[key, this.head]]);
    }

    insert(key: number) {
        const node = new ListNode(key, this.tail);
        this.lookup.set(key, node);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    delete(key: number) {
        if (!this.lookup.has(key)) {
            return false;
        }

        const node = this.lookup.get(key);
        this.lookup.delete(key);

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        return true;
    }

    pop() {
        const key = this.head.key;
        this.delete(key);
        return key;
    }

    isEmpty() {
        return !this.lookup.size;
    }
}

export class LFUCache {
    lists = new Map<number, LinkedList>();
    values = new Map<number, number>();
    counts = new Map<number, number>();

    capacity: number;
    size = 0;
    minCount = 0;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: number): number {
        if (!this.values.has(key)) {
            return -1;
        }

        this.updateCount(key);
        return this.values.get(key);
    }

    put(key: number, value: number): void {
        this.values.set(key, value);

        if (this.counts.has(key)) {
            this.updateCount(key);
        } else {
            this.insertKey(key);
        }
    }

    updateCount(key: number) {
        const count = this.counts.get(key);
        const oldList = this.lists.get(count);
        oldList.delete(key);

        if (!this.lists.has(count + 1)) {
            const list = new LinkedList(key);
            this.lists.set(count + 1, list);
        } else {
            const list = this.lists.get(count + 1);
            list.insert(key);
        }

        if (count === this.minCount && oldList.isEmpty()) {
            this.minCount++;
        }

        this.counts.set(key, count + 1);
    }

    insertKey(key: number) {
        this.counts.set(key, 1);
        this.size++;

        if (!this.lists.has(1)) {
            const list = new LinkedList(key);
            this.lists.set(1, list);
        } else {
            const list = this.lists.get(1);
            list.insert(key);
        }

        if (this.size > this.capacity) {
            const list = this.lists.get(this.minCount);
            const deleted = list.pop();

            this.counts.delete(deleted);
            this.values.delete(deleted);
            this.size--;
        }

        this.minCount = 1;
    }
}
