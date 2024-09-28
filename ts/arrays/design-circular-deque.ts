export class MyCircularDeque {
    data: number[];
    capacity: number;
    head = 0;
    tail = 0;
    size = 0;

    constructor(k: number) {
        this.capacity = k;
        this.data = Array(k).fill(0);
    }

    insertFront(value: number): boolean {
        if (this.isFull()) {
            return false;
        }

        if (this.isEmpty()) {
            this.data[this.head] = value;
            this.size++;
            return true;
        }

        this.head = (this.head + this.capacity - 1) % this.capacity;
        this.data[this.head] = value;
        this.size++;
        return true;
    }

    insertLast(value: number): boolean {
        if (this.isFull()) {
            return false;
        }

        if (this.isEmpty()) {
            this.data[this.tail] = value;
            this.size++;
            return true;
        }

        this.tail = (this.tail + 1) % this.capacity;
        this.data[this.tail] = value;
        this.size++;
        return true;
    }

    deleteFront(): boolean {
        if (this.isEmpty()) {
            return false;
        }

        this.size--;
        if (!this.isEmpty()) {
            this.head = (this.head + 1) % this.capacity;
        }
        return true;
    }

    deleteLast(): boolean {
        if (this.isEmpty()) {
            return false;
        }

        this.size--;
        if (!this.isEmpty()) {
            this.tail = (this.tail + this.capacity - 1) % this.capacity;
        }
        return true;
    }

    getFront(): number {
        if (this.isEmpty()) {
            return -1;
        }
        return this.data[this.head];
    }

    getRear(): number {
        if (this.isEmpty()) {
            return -1;
        }
        return this.data[this.tail];
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    isFull(): boolean {
        return this.size === this.capacity;
    }
}
