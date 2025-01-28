export function findMaxFish(grid: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];
    const ROWS = grid.length;
    const COLS = grid[0].length;
    let res = 0;

    const dfs = (row: number, col: number) => {
        if (row < 0 || row === ROWS || col < 0 || col === COLS || grid[row][col] <= 0) {
            return 0;
        }

        let sum = grid[row][col];
        grid[row][col] = -grid[row][col];

        for (const [dr, dc] of DIRS) {
            const nr = row + dr;
            const nc = col + dc;
            sum += dfs(nr, nc);
        }

        return sum;
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            res = Math.max(res, dfs(row, col));
        }
    }

    return res;
};

export function findMaxFishBfs(grid: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];
    const ROWS = grid.length;
    const COLS = grid[0].length;
    let res = 0;

    const bfs = (start: [number, number]) => {
        let queue = [start];
        let sum = 0;

        while (queue.length) {
            const nextQueue = [];

            for (const [row, col] of queue) {
                if (grid[row][col] <= 0) {
                    continue;
                }
                sum += grid[row][col];
                grid[row][col] = -grid[row][col];

                for (const [dr, dc] of DIRS) {
                    const nr = row + dr;
                    const nc = col + dc;

                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        nextQueue.push([nr, nc]);
                    }
                }
            }
            queue = nextQueue;
        }

        return sum;
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            res = Math.max(res, bfs([row, col]));
        }
    }

    return res;
};