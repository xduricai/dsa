import { ListNode } from "./list-node";

export function reverseBetween(
    head: ListNode | null,
    left: number,
    right: number
): ListNode | null {
    const preHead = new ListNode(-1, head);
    let leftTail = preHead;

    // find the tail of the left non-reversed section
    for (let idx = 1; idx < left; idx++) {
        leftTail = leftTail.next;
    }

    // save the node that will end up at the end of the reversed section
    const reversedTail = leftTail.next;
    let rest = reversedTail;
    let reversed = null;

    for (let idx = left; idx <= right; idx++) {
        const current = rest;
        rest = rest.next;
        current.next = reversed;
        reversed = current;
    }

    // attach reversed section to the rest of the list
    leftTail.next = reversed;
    reversedTail.next = rest;
    return preHead.next;
}
