export function searchMatrix(matrix: number[][], target: number) {
    const width = matrix[0].length;
    let low = 0;
    let hi = matrix.length - 1;
    let row = -1;

    while (low <= hi) {
        const mid = Math.floor((low + hi) / 2);

        if (target === matrix[mid][0] || target === matrix[mid][width - 1]) return true;
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