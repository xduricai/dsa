// LC 3342 (https://leetcode.com/problems/find-minimum-time-to-reach-last-room-ii)

import { Heap } from "../heap/custom-heap";

export function minTimeToReach(moveTime: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const ROWS = moveTime.length;
    const COLS = moveTime[0].length;

    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    const heap = new Heap<[number, number, number]>(
        (a, b) => a[0] - b[0],
        [[0, 0, 0]]
    );

    while (heap.size) {
        const [time, row, col] = heap.pop();

        if (row === ROWS - 1 && col === COLS - 1) {
            return time;
        }
        if (visited[row][col]) {
            continue;
        }
        visited[row][col] = true;

        for (const [dr, dc] of DIRS) {
            const nr = row + dr;
            const nc = col + dc;

            if (
                nr < 0 ||
                nr === ROWS ||
                nc < 0 ||
                nc === COLS ||
                visited[nr][nc]
            ) {
                continue;
            }

            const nt = Math.max(time, moveTime[nr][nc]) + ((row + col) % 2) + 1;
            heap.push([nt, nr, nc]);
        }
    }
}
