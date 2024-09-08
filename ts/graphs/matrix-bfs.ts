// 8-directional
export function shortestPathBinaryMatrix(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const DIRS = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
    ];

    const seen = new Set<string>();
    const queue: [number, number][] = [[0, 0]];
    let path = 1;

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < ROWS && col < COLS;
    };

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const [row, col] = queue.shift();
            const key = `${row}-${col}`;

            if (!inBounds(row, col) || grid[row][col] === 1 || seen.has(key)) {
                continue;
            }
            if (row === ROWS - 1 && col === COLS - 1) {
                return path;
            }

            seen.add(key);
            for (const [dr, dc] of DIRS) {
                queue.push([row + dr, col + dc]);
            }
        }
        path++;
    }
    return -1;
}

// 4-directional
export function shortestPath(grid: number[][]) {
    const ROWS = grid.length;
    const COLS = grid[0].length;

    const seen = new Set<string>();
    const queue: [number, number][] = [[0, 0]];
    let path = 0;

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < ROWS && col < COLS;
    };

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const [row, col] = queue.shift();
            const key = `${row}-${col}`;

            if (!inBounds(row, col) || grid[row][col] === 1 || seen.has(key)) {
                continue;
            }
            if (row === ROWS - 1 && col === COLS - 1) {
                return path;
            }

            seen.add(key);
            queue.push([row - 1, col]);
            queue.push([row, col + 1]);
            queue.push([row + 1, col]);
            queue.push([row, col - 1]);
        }
        path++;
    }
    return -1;
}
