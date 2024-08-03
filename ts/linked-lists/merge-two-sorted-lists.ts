import { ListNode } from "./list-node";

export function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    let a = list1;
    let b = list2;
    let head = new ListNode();
    let tail = head;

    while (a || b) {
        if (!a || (b && b.val < a.val)) {
            tail.next = b;
            tail = tail.next;
            b = b.next;
        } else {
            tail.next = a;
            tail = tail.next;
            a = a.next;
        }
    }
    return head.next;
}
