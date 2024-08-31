import { ListNode } from "./list-node";

export class MyLinkedList {
    head?: ListNode;
    tail?: ListNode;
    length = 0;

    get(index: number): number {
        if (index >= this.length) {
            return -1;
        }
        let current = this.head;
        let idx = 0;

        while (idx < index) {
            current = current.next;
            idx++;
        }
        return current.val;
    }

    addAtHead(val: number): void {
        const node = new ListNode(val, this.head);

        if (!this.head) {
            this.tail = node;
        }

        this.head = node;
        this.length++;
    }

    addAtTail(val: number): void {
        const node = new ListNode(val);

        if (this.tail) {
            this.tail.next = node;
        } else {
            this.head = node;
        }

        this.tail = node;
        this.length++;
    }

    addAtIndex(index: number, val: number): void {
        if (index > this.length) {
            return;
        }
        if (index === 0) {
            return this.addAtHead(val);
        }
        if (index === this.length) {
            return this.addAtTail(val);
        }

        const node = new ListNode(val);
        let current = this.head;
        let prev = null;
        let idx = 0;
        while (idx < index) {
            prev = current;
            current = current.next;
            idx++;
        }

        node.next = current;
        if (prev) {
            prev.next = node;
        }
        this.length++;
    }

    deleteAtIndex(index: number): void {
        if (index >= this.length) {
            return;
        }
        let current = this.head;
        let prev = null;
        let idx = 0;

        while (idx < index) {
            prev = current;
            current = current.next;
            idx++;
        }

        if (index === 0) {
            this.head = this.head.next;
        }
        if (index === this.length - 1) {
            this.tail = prev;
        }
        if (prev) {
            prev.next = current.next;
        }
        this.length--;
    }
}
