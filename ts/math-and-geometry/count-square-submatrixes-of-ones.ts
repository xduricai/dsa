export function countSquares(matrix: number[][]): number {
    let count = 0;

    const checkSquares = (row: number, col: number) => {
        let size = 0;

        while (row + size < matrix.length && col + size < matrix[0].length) {
            if (matrix[row + size][col + size] === 0) {
                return size;
            }
            for (let r = row; r < row + size; r++) {
                if (matrix[r][col + size] === 0) {
                    return size;
                }
            }
            for (let c = col; c < col + size; c++) {
                if (matrix[row + size][c] === 0) {
                    return size;
                }
            }
            size++;
        }
        return size;
    };

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            count += checkSquares(row, col);
        }
    }

    return count;
}
