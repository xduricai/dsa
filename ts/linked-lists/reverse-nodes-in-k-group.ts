import { ListNode } from "./list-node";

export function reverseKGroup(head: ListNode, k: number) {
    let preHead = new ListNode(0, head);
    let left = preHead;
    let right = preHead;

    while (true) {
        for (let i = 0; i < k; i++) {
            right = right.next;
            if (!right) return preHead.next;
        }
        const nextLeft = left.next;
        let tempHead = right.next;
        let current = left.next;

        for (let i = 0; i < k; i++) {
            const next = current.next;
            current.next = tempHead;
            tempHead = current;
            current = next;
        }
        left.next = tempHead;
        left = nextLeft;
        right = nextLeft;
    }
}