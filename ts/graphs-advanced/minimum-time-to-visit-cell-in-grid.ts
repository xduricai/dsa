import { Heap } from "../heap/heap";

export function minimumTime(grid: number[][]): number {
    // can't ever leave initial cell
    if (grid[0][1] > 1 && grid[1][0] > 1) {
        return -1;
    }

    const TARGET = `${grid.length - 1}-${grid[0].length - 1}`;
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    const seen = new Set<string>();
    const heap = new Heap<[number, number, number]>();
    heap.add([0, 0, 0]);

    while (heap.length) {
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

            if (
                newRow < 0 ||
                newCol < 0 ||
                newRow >= grid.length ||
                newCol >= grid[0].length
            ) {
                continue;
            }

            if (seen.has(`${newRow}-${newCol}`)) {
                continue;
            }

            let newCost = -1;

            // we may need to pace back and forth to be able to access the next cell
            // if the cost difference is even, we will end up wasting 1 turn by going back to the neighboring cell
            if (cost + 1 >= grid[newRow][newCol]) {
                newCost = cost + 1;
            } else if ((grid[newRow][newCol] - cost) % 2 === 1) {
                newCost = grid[newRow][newCol];
            } else {
                newCost = grid[newRow][newCol] + 1;
            }

            heap.add([newCost, newRow, newCol]);
        }
    }

    return -1;
}
