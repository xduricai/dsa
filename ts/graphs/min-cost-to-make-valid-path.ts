import { Heap } from "../heap/custom-heap";

// prepend nodes with a shorter distance, append nodes with a longer distance to keep a monotonically increasing queue
export function minCost(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const DIRS = [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const distances = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(Infinity)
    );
    const queue = [[0, 0, 0]];

    while (queue.length) {
        const [cost, row, col] = queue.shift();

        if (row === ROWS - 1 && col === COLS - 1) {
            return cost;
        }

        for (let dir = 1; dir <= 4; dir++) {
            const nr = row + DIRS[dir][0];
            const nc = col + DIRS[dir][1];
            const ncost = grid[row][col] === dir ? cost : cost + 1;

            if (nr < 0 || nc < 0 || nr === ROWS || nc === COLS) {
                continue;
            }

            if (distances[nr][nc] <= ncost) {
                continue;
            }
            distances[nr][nc] = ncost;

            if (grid[row][col] === dir) {
                queue.unshift([ncost, nr, nc]);
            } else {
                queue.push([ncost, nr, nc]);
            }
        }
    }
}

// look at all nodes with a distance of n before considering ones with a distance of n + 1
export function minCostAlt(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const DIRS = [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const distances = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(Infinity)
    );
    let queue = [[0, 0, 0]];

    while (true) {
        const nextQueue = [];

        for (const [cost, row, col] of queue) {
            if (row === ROWS - 1 && col === COLS - 1) {
                return cost;
            }

            if (distances[row][col] <= cost) {
                continue;
            }
            distances[row][col] = cost;

            for (let dir = 1; dir <= 4; dir++) {
                const nr = row + DIRS[dir][0];
                const nc = col + DIRS[dir][1];

                if (nr < 0 || nc < 0 || nr === ROWS || nc === COLS) {
                    continue;
                }

                if (grid[row][col] === dir) {
                    queue.push([cost, nr, nc]);
                } else {
                    nextQueue.push([cost + 1, nr, nc]);
                }
            }
        }
        queue = nextQueue;
    }
}

type Cell = [number, number, number];

// Dijkstra + Heap
export function minCostDijkstra(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const DIRS = [
        [0, 0],
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const heap = new Heap<Cell>((a: Cell, b: Cell) => a[0] - b[0], [[0, 0, 0]]);
    const seen = new Set<string>();

    while (heap.size) {
        const [cost, row, col] = heap.pop();
        const key = `${row}-${col}`;

        if (seen.has(key)) {
            continue;
        }
        seen.add(key);

        if (row === ROWS - 1 && col === COLS - 1) {
            return cost;
        }

        for (let idx = 1; idx <= 4; idx++) {
            const r = row + DIRS[idx][0];
            const c = col + DIRS[idx][1];

            if (r < 0 || r === ROWS || c < 0 || c === COLS) {
                continue;
            }
            if (seen.has(`${r}-${c}`)) {
                continue;
            }

            if (idx === grid[row][col]) {
                heap.push([cost, r, c]);
            } else {
                heap.push([cost + 1, r, c]);
            }
        }
    }

    return ROWS * COLS;
}
