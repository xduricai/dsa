export function islandPerimeter(grid: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const ROWS = grid.length;
    const COLS = grid[0].length;
    let res = 0;

    const inBounds = (row: number, col: number) => {
        return row >= 0 && row < ROWS && col >= 0 && col < COLS;
    };

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (grid[row][col] === 0) {
                continue;
            }

            for (const [dr, dc] of DIRS) {
                const nr = row + dr;
                const nc = col + dc;

                if (!inBounds(nr, nc) || grid[nr][nc] === 0) {
                    res++;
                }
            }
        }
    }

    return res;
}
