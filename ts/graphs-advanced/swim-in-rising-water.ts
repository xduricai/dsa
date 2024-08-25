import { Heap } from "../heap/heap";

export function swimInWater(grid: number[][]): number {
    const dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const height = grid.length;
    const width = grid[0].length;

    const visited = new Set<string>();
    const heap = new Heap<[number, number, number]>();
    heap.add([grid[0][0], 0, 0]);

    while (heap.length) {
        const [cost, row, col] = heap.delete();
        const key = `${row}-${col}`;

        if (visited.has(key)) {
            continue;
        }
        if (row === height - 1 && col === width - 1) {
            return cost;
        }
        visited.add(key);

        for (const [r, c] of dirs) {
            const dr = row + r;
            const dc = col + c;

            if (
                dr < 0 ||
                dc < 0 ||
                dr >= height ||
                dc >= width ||
                visited.has(`${dr}-${dc}`)
            ) {
                continue;
            }
            heap.add([Math.max(cost, grid[dr][dc]), dr, dc]);
        }
    }
}
