export function spiralOrder(matrix: number[][]): number[] {
    const output = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // top edge
        for (let idx = left; idx <= right; idx++) {
            output.push(matrix[top][idx]);
        }
        top++;

        //right edge
        for (let idx = top; idx <= bottom; idx++) {
            output.push(matrix[idx][right]);
        }
        right--;

        // recheck condition
        if (!(top <= bottom && left <= right)) {
            break;
        }

        for (let idx = right; idx >= left; idx--) {
            output.push(matrix[bottom][idx]);
        }
        bottom--;

        for (let idx = bottom; idx >= top; idx--) {
            output.push(matrix[idx][left]);
        }
        left++;
    }
    return output;
}
