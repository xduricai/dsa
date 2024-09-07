import { ListNode } from "./list-node";

export function modifiedList(
    nums: number[],
    head: ListNode | null
): ListNode | null {
    const numSet = new Set<number>(nums);
    let current = head;
    let previous = null;

    while (current) {
        if (!numSet.has(current.val)) {
            previous = current;
            current = current.next;
            continue;
        }

        if (previous) {
            previous.next = current.next;
            current = current.next;
        } else {
            head = current.next;
            current = current.next;
        }
    }
    return head;
}
