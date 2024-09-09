import { ListNode } from "../linked-lists/list-node";

export function spiralMatrix(
    m: number,
    n: number,
    head: ListNode | null
): number[][] {
    const matrix = Array(m)
        .fill(null)
        .map((_) => Array(n).fill(-1));
    let top = 0;
    let right = n - 1;
    let bottom = m - 1;
    let left = 0;

    while (top <= bottom && left <= right && head) {
        for (let col = left; col <= right && head; col++) {
            matrix[top][col] = head.val;
            head = head.next;
        }
        top++;

        for (let row = top; row <= bottom && head; row++) {
            matrix[row][right] = head.val;
            head = head.next;
        }
        right--;

        if (!(top <= bottom && left <= right && head)) {
            break;
        }

        for (let col = right; col >= left && head; col--) {
            matrix[bottom][col] = head.val;
            head = head.next;
        }
        bottom--;

        for (let row = bottom; row >= top && head; row--) {
            matrix[row][left] = head.val;
            head = head.next;
        }
        left++;
    }
    return matrix;
}
