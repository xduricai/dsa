import { ListNode } from "./list-node";

export function splitListToParts(
    head: ListNode | null,
    k: number
): Array<ListNode | null> {
    const pointers = [];
    let current = head;
    let length = 0;

    while (current) {
        current = current.next;
        length++;
    }

    const base = Math.floor(length / k);
    let remainder = length % k;
    current = head;

    while (current) {
        pointers.push(current);
        let target = base - 1;

        if (remainder) {
            target++;
            remainder--;
        }

        for (let iter = 0; current && iter < target; iter++) {
            current = current.next;
        }

        if (current) {
            const next = current.next;
            current.next = null;
            current = next;
        }
    }

    while (pointers.length < k) {
        pointers.push(null);
    }

    return pointers;
}
