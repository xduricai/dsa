import { ListNode } from "./list-node";

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (!lists?.length) return null;

    while (lists.length > 1) {
        const merged = [];

        for (let idx = 0; idx < lists.length; idx += 2) {
            const list1 = lists[idx];
            const list2 = idx + 1 < lists.length ? lists[idx + 1] : null;
            merged.push(merge(list1, list2));
        }
        lists = merged;
    }
    return lists[0];
};

function merge(list1: ListNode, list2: ListNode) {
    const preHead = new ListNode(0, null);
    let current = preHead;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    if (list1) current.next = list1;
    else current.next = list2;
    return preHead.next;
}
