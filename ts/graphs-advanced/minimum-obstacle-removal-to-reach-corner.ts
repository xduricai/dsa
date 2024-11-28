import { Heap } from "../heap/heap";

export function minimumObstacles(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const TARGET = `${ROWS - 1}-${COLS - 1}`;
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    const heap = new Heap<[number, number, number]>();
    const seen = new Set<string>();
    heap.add([0, 0, 0]);

    while (true) {
        const [cost, row, col] = heap.delete();
        const key = `${row}-${col}`;

        if (key === TARGET) {
            return cost;
        }

        if (seen.has(key)) {
            continue;
        }

        seen.add(key);

        for (const [dr, dc] of DIRS) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (seen.has(`${newRow}-${newCol}`)) {
                continue;
            }
            if (
                newRow < 0 ||
                newCol < 0 ||
                newRow === ROWS ||
                newCol === COLS
            ) {
                continue;
            }

            if (grid[row][col] === 1) {
                heap.add([cost + 1, newRow, newCol]);
            } else {
                heap.add([cost, newRow, newCol]);
            }
        }
    }
}
