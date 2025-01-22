// slightly more optimised version
export function highestPeak(isWater: number[][]): number[][] {
    const ROWS = isWater.length;
    const COLS = isWater[0].length;
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));
    let queue = [];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (isWater[row][col]) {
                grid[row][col] = 0;
                queue.push([row, col]);
            }
        }
    }

    while (queue.length) {
        const nextQueue = [];

        for (const [row, col] of queue) {
            const height = grid[row][col];

            for (const [dr, dc] of DIRS) {
                const nr = row + dr;
                const nc = col + dc;

                if (
                    nr >= 0 &&
                    nr < ROWS &&
                    nc >= 0 &&
                    nc < COLS &&
                    grid[nr][nc] === -1
                ) {
                    nextQueue.push([nr, nc]);
                    grid[nr][nc] = height + 1;
                }
            }
        }
        queue = nextQueue;
    }

    return grid;
}

export function highestPeakAlt(isWater: number[][]): number[][] {
    const ROWS = isWater.length;
    const COLS = isWater[0].length;
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));
    let queue = [];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (isWater[row][col]) {
                queue.push([0, row, col]);
            }
        }
    }

    while (queue.length) {
        const nextQueue = [];

        for (const [height, row, col] of queue) {
            if (grid[row][col] !== -1) {
                continue;
            }
            grid[row][col] = height;

            for (const [dr, dc] of DIRS) {
                const nr = row + dr;
                const nc = col + dc;

                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                    nextQueue.push([height + 1, nr, nc]);
                }
            }
        }
        queue = nextQueue;
    }

    return grid;
}
