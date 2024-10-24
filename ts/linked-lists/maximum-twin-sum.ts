import { ListNode } from "./list-node";

export function pairSum(head: ListNode | null): number {
    let slow = head;
    let fast = head;

    while (fast?.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let head2 = null;
    let current = slow;

    while (current) {
        const next = current.next;
        current.next = head2;
        head2 = current;
        current = next;
    }

    let max = 0;
    let first = head;
    let second = head2;

    while (second) {
        max = Math.max(max, first.val + second.val);
        first = first.next;
        second = second.next;
    }
    return max;
}
