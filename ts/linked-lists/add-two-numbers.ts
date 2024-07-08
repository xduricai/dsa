import { ListNode } from "./list-node";

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const head = new ListNode(0, null);
    let current = head;
    let carry = 0;

    while (l1 || l2 || carry) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10, null);
        
        current = current.next;
        l1 = l1?.next;
        l2 = l2?.next; 
    }
    return head.next;
}