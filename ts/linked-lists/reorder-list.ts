import { ListNode } from "./list-node";

export function reorderList(head: ListNode | null): void {
    let slow = head;
    let fast = head.next;

    while (fast?.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let half = null;
    let current = slow.next;
    slow.next = null;

    while (current) {
        const temp = current.next;
        current.next = half;
        half = current;
        current = temp;
    }

    while (half) {
        const tempL = head.next;
        const tempR = half.next;

        head.next = half;
        half.next = tempL;
        head = tempL;
        half = tempR;
    }
}