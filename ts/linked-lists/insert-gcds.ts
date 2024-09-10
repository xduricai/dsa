import { ListNode } from "./list-node";

export function insertGreatestCommonDivisors(
    head: ListNode | null
): ListNode | null {
    let current = head;

    while (current.next) {
        const num = gcd(current.val, current.next.val);
        const node = new ListNode(num, current.next);
        current.next = node;
        current = node.next;
    }
    return head;
}

export function gcd(a: number, b: number) {
    let temp = 0;

    while (b !== 0) {
        temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
