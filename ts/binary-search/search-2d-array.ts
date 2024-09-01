export function searchMatrix(matrix: number[][], target: number) {
    const width = matrix[0].length;
    let low = 0;
    let hi = matrix.length - 1;
    let row = -1;

    while (low <= hi) {
        const mid = Math.floor((low + hi) / 2);

        if (target === matrix[mid][0] || target === matrix[mid][width - 1])
            return true;
        if (target > matrix[mid][0] && target < matrix[mid][width - 1]) {
            row = mid;
            break;
        }
        if (matrix[mid][0] > target) hi = mid - 1;
        else low = mid + 1;
    }
    if (row === -1) return false;

    low = 0;
    hi = width - 1;

    while (low <= hi) {
        const mid = Math.floor((low + hi) / 2);
        if (matrix[row][mid] === target) return true;

        if (matrix[row][mid] > target) hi = mid - 1;
        else low = mid + 1;
    }
    return false;
}

// if every row is of the same length
function searchMatrixAlt(matrix: number[][], target: number) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    const getPos = (mid: number) => {
        const row = Math.floor(mid / COLS);
        const col = mid % COLS;
        return [row, col];
    };

    let low = 0;
    let hi = ROWS * COLS - 1;

    while (low <= hi) {
        const mid = Math.floor((hi + low) / 2);
        const [row, col] = getPos(mid);

        if (matrix[row][col] > target) {
            hi = mid - 1;
        } else if (matrix[row][col] < target) {
            low = mid + 1;
        } else {
            return true;
        }
    }
    return false;
}
