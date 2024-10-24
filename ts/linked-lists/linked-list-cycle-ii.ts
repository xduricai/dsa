import { ListNode } from "./list-node";

// O(1) space
export function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;

    while (fast?.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            break;
        }
    }

    if (!fast?.next) {
        return null;
    }

    while (head !== slow) {
        head = head.next;
        slow = slow.next;
    }
    return head;
}

// O(n) space
export function detectCycleAlt(head: ListNode | null): ListNode | null {
    const seen = new Set<ListNode>();
    let ptr = head;

    while (ptr) {
        if (seen.has(ptr)) {
            return ptr;
        }

        seen.add(ptr);
        ptr = ptr.next;
    }

    return null;
}
