import { ListNode } from "./list-node";

export function reverseList(head: ListNode | null): ListNode | null {
    let start = null;
    let next = null;

    while (head) {
        next = head.next;
        head.next = start;
        start = head;
        head = next;
    }
    return start;
};