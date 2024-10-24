import { ListNode } from "./list-node";

export function middleNode(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;

    while (fast?.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
