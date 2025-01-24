import { Heap } from "../heap/custom-heap";

// Dijkstra's
export function minimumEffortPath(heights: number[][]): number {
    const ROWS = heights.length;
    const COLS = heights[0].length;
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    const visited = new Set<string>();
    const heap = new Heap<[number, number, number]>((a, b) => a[0] - b[0]);
    heap.push([0, 0, 0]);

    while (heap.size) {
        const [effort, row, col] = heap.pop();
        const key = `${row}-${col}`;

        if (row === ROWS - 1 && col === COLS - 1) {
            return effort;
        }
        if (visited.has(key)) {
            continue;
        }
        visited.add(key);

        for (const [dr, dc] of DIRS) {
            const nr = row + dr;
            const nc = col + dc;

            if (
                nr >= 0 &&
                nr < ROWS &&
                nc >= 0 &&
                nc < COLS &&
                !visited.has(`${nr}-${nc}`)
            ) {
                const eff = Math.max(
                    effort,
                    Math.abs(heights[row][col] - heights[nr][nc])
                );
                heap.push([eff, nr, nc]);
            }
        }
    }
}
