class QueueNode {
    value: number = 0;
    next: QueueNode;
}

export class MyCircularQueue {
    head: QueueNode;
    tail: QueueNode;
    length: number;
    capacity: number;

    constructor(k: number) {
        this.length = 0;
        this.capacity = k;
        this.head = new QueueNode();
        let current = this.head;

        for (let nodes = 1; nodes < k; nodes++) {
            current.next = new QueueNode();
            current = current.next;
        }

        current.next = this.head;
        this.tail = current;
    }

    enQueue(value: number): boolean {
        if (this.isFull()) {
            return false;
        }

        this.tail = this.tail.next;
        this.tail.value = value;
        this.length++;

        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) {
            return false;
        }

        this.head = this.head.next;
        this.length--;

        return true;
    }

    Front(): number {
        if (this.isEmpty()) {
            return -1;
        }
        return this.head.value;
    }

    Rear(): number {
        if (this.isEmpty()) {
            return -1;
        }
        return this.tail.value;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    isFull(): boolean {
        return this.length === this.capacity;
    }
}
