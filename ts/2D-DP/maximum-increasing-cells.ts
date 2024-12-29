export function maxIncreasingCells(mat: number[][]): number {
    const ROWS = mat.length;
    const COLS = mat[0].length;

    const valueMap = new Map<number, [number, number][]>();
    const rowConnected = Array(ROWS).fill(0); // number of connected cells in each row
    const colConnected = Array(COLS).fill(0); // number of connected cells in each column

    let res = 0;

    // map values onto row/col combinations where they occur
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const list = valueMap.get(mat[row][col]);

            if (list) {
                list.push([row, col]);
            } else {
                valueMap.set(mat[row][col], [[row, col]]);
            }
        }
    }

    for (const key of Array.from(valueMap.keys()).sort((a, b) => a - b)) {
        const dp = new Map();

        for (const [row, col] of valueMap.get(key)) {
            const max = 1 + Math.max(rowConnected[row], colConnected[col]);
            dp.set(`${row}-${col}`, max);
            res = Math.max(res, max);
        }

        for (const [row, col] of valueMap.get(key)) {
            rowConnected[row] = Math.max(
                rowConnected[row],
                dp.get(`${row}-${col}`)
            );
            colConnected[col] = Math.max(
                colConnected[col],
                dp.get(`${row}-${col}`)
            );
        }
    }

    return res;
}

// suboptimal solution, TLE
export function maxIncreasingCellsDfs(mat: number[][]): number {
    const ROWS = mat.length;
    const COLS = mat[0].length;

    const valueMap = new Map<number, [number, number][]>();
    const DP = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    let max = 0;

    // map values onto row/col combinations where they occur
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const list = valueMap.get(mat[row][col]);

            if (list) {
                list.push([row, col]);
            } else {
                valueMap.set(mat[row][col], [[row, col]]);
            }
        }
    }

    const dfs = (row: number, col: number) => {
        if (DP[row][col]) {
            return DP[row][col];
        }

        let res = 0;

        for (let r = 0; r < ROWS; r++) {
            if (mat[r][col] > mat[row][col]) {
                res = Math.max(res, dfs(r, col));
            }
        }

        for (let c = 0; c < COLS; c++) {
            if (mat[row][c] > mat[row][col]) {
                res = Math.max(res, dfs(row, c));
            }
        }

        DP[row][col] = res + 1;
        return DP[row][col];
    };

    for (const key of Array.from(valueMap.keys()).sort((a, b) => a - b)) {
        for (const [row, col] of valueMap.get(key)) {
            max = Math.max(max, dfs(row, col));
        }
    }

    return max;
}
