import { Heap } from "../heap/custom-heap";

export function trapRainWater(heightMap: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const ROWS = heightMap.length;
    const COLS = heightMap[0].length;
    const heap = new Heap<[number, number, number]>((a, b) => a[0] - b[0]);
    let res = 0;
    let maxHeight = -1;

    // push top and bottom edges
    for (let col = 0; col < COLS; col++) {
        heap.push([heightMap[0][col], 0, col]);
        heap.push([heightMap[ROWS - 1][col], ROWS - 1, col]);

        heightMap[0][col] = -1;
        heightMap[ROWS - 1][col] = -1;
    }
    // push left and right edges
    for (let row = 1; row < ROWS - 1; row++) {
        heap.push([heightMap[row][0], row, 0]);
        heap.push([heightMap[row][COLS - 1], row, COLS - 1]);

        heightMap[row][0] = -1;
        heightMap[row][COLS - 1] = -1;
    }

    while (heap.size) {
        const [height, row, col] = heap.pop();
        maxHeight = Math.max(maxHeight, height);
        res += maxHeight - height;

        for (const [dr, dc] of DIRS) {
            const r = row + dr;
            const c = col + dc;

            if (r < 0 || r === ROWS || c < 0 || c === COLS) {
                continue;
            }
            if (heightMap[r][c] === -1) {
                continue;
            }

            heap.push([heightMap[r][c], r, c]);
            heightMap[r][c] = -1;
        }
    }

    return res;
}
