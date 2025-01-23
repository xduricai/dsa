export function countServers(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    const rowCount = Array(ROWS).fill(0);
    const colCount = Array(COLS).fill(0);
    let res = 0;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (grid[row][col]) {
                rowCount[row]++;
                colCount[col]++;
            }
        }
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (grid[row][col] && (rowCount[row] > 1 || colCount[col] > 1)) {
                res++;
            }
        }
    }

    return res;
}
