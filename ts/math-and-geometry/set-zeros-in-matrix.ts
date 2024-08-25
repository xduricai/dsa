export function setZeroes(matrix: number[][]): void {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;
    let firstRow = false;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (matrix[row][col] === 0) {
                matrix[0][col] = 0;

                if (row > 0) {
                    matrix[row][0] = 0;
                } else {
                    firstRow = true;
                }
            }
        }
    }

    // set to 0 if corresponding row/col is all 0's
    for (let row = 1; row < ROWS; row++) {
        for (let col = 1; col < COLS; col++) {
            if (matrix[0][col] === 0 || matrix[row][0] === 0) {
                matrix[row][col] = 0;
            }
        }
    }

    // 0 first column if needed
    if (matrix[0][0] === 0) {
        for (let row = 0; row < ROWS; row++) {
            matrix[row][0] = 0;
        }
    }
    // 0 first row if needed
    if (firstRow) {
        for (let col = 0; col < COLS; col++) {
            matrix[0][col] = 0;
        }
    }
}
