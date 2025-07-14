// LC 1290 (https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer)

import { ListNode } from "../linked-lists/list-node";

export function getDecimalValue(head: ListNode | null): number {
  let res = 0;

  while (head) {
    res <<= 1;
    res |= head.val;
    head = head.next;
  }

  return res;
};