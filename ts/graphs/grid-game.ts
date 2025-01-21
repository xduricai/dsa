export function gridGame(grid: number[][]): number {
    // sum of untouched top row elements
    let top = grid[0].reduce((acc, curr) => acc + curr, 0);
    // sum of untouched bottom row elements
    let bottom = 0;
    let res = Infinity;

    for (let idx = 0; idx < grid[0].length; idx++) {
        top -= grid[0][idx];
        res = Math.min(res, Math.max(top, bottom));
        bottom += grid[1][idx];
    }

    return res;
}

// less memory efficient solution, computes prefix sum arrays for both rows
export function gridGamePrefix(grid: number[][]): number {
    const COLS = grid[0].length;
    const prefixTop = Array(COLS + 1).fill(0);
    const prefixBot = Array(COLS + 1).fill(0);
    let res = Infinity;

    for (let idx = 1; idx <= COLS; idx++) {
        prefixTop[idx] = prefixTop[idx - 1] + grid[0][idx - 1];
        prefixBot[idx] = prefixBot[idx - 1] + grid[1][idx - 1];
    }

    for (let idx = 1; idx <= COLS; idx++) {
        const maxTop = prefixTop[COLS] - prefixTop[idx];
        const maxBot = prefixBot[idx - 1];
        res = Math.min(res, Math.max(maxTop, maxBot));
    }

    return res;
}
