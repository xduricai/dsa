export function transpose(matrix: number[][]): number[][] {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    // can be solved in O(1) memory if both dimensions are equal
    if (ROWS === COLS) {
        for (let row = 0; row < ROWS; row++) {
            // only go up to current row to avoid double swaps
            for (let col = 0; col < row; col++) {
                const temp = matrix[row][col];
                matrix[row][col] = matrix[col][row];
                matrix[col][row] = temp;
            }
        }

        return matrix;
    }

    const transposed = Array.from({ length: COLS }, () => Array(ROWS));

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            transposed[col][row] = matrix[row][col];
        }
    }

    return transposed;
}
