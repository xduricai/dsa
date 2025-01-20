export function firstCompleteIndex(arr: number[], mat: number[][]): number {
    const ROWS = mat.length;
    const COLS = mat[0].length;

    // number of painted tiles in each row/col
    const rowCounts = Array(ROWS).fill(0);
    const colCounts = Array(COLS).fill(0);
    // the row/col that a given value occupies in the grid
    const valueRows = Array(ROWS * COLS + 1);
    const valueCols = Array(ROWS * COLS + 1);

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            valueRows[mat[row][col]] = row;
            valueCols[mat[row][col]] = col;
        }
    }

    for (let idx = 0; idx < arr.length; idx++) {
        const row = valueRows[arr[idx]];
        const col = valueCols[arr[idx]];

        rowCounts[row]++;
        colCounts[col]++;

        // return once a row/col has been completely filled in
        if (rowCounts[row] === COLS || colCounts[col] === ROWS) {
            return idx;
        }
    }

    return arr.length - 1;
}

// less space optimized version using a hash map
export function firstCompleteIndexAlt(arr: number[], mat: number[][]): number {
    const ROWS = mat.length;
    const COLS = mat[0].length;

    const rowCounts = Array(ROWS).fill(0);
    const colCounts = Array(COLS).fill(0);
    const valueMap = new Map<number, [number, number]>();

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            valueMap.set(mat[row][col], [row, col]);
        }
    }

    for (let idx = 0; idx < arr.length; idx++) {
        const [row, col] = valueMap.get(arr[idx]);
        rowCounts[row]++;
        colCounts[col]++;

        if (rowCounts[row] === COLS || colCounts[col] === ROWS) {
            return idx;
        }
    }

    return arr.length - 1;
}
