import { ListNode } from "./list-node";

export function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head?.next;

    while (fast) {
        if (slow === fast) return true;

        fast = fast.next?.next;
        slow = slow.next;
    }
    return false;
}
