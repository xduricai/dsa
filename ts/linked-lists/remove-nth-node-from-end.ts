import { ListNode } from "./list-node";

export function removeNthFromEnd(
    head: ListNode | null,
    n: number
): ListNode | null {
    let start = new ListNode(0, head);
    let left = start;
    let right = head;

    while (n > 0) {
        right = right.next;
        n--;
    }
    while (right) {
        left = left.next;
        right = right.next;
    }
    left.next = left.next.next;
    return start.next;
}
