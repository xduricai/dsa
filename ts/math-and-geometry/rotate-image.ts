export function rotate(matrix: number[][]): void {
    let start = 0;
    let end = matrix.length - 1;

    while (start < end) {
        for (let idx = 0; idx < end - start; idx++) {
            // store top value
            const temp = matrix[start][start + idx];

            // write left value to top
            matrix[start][start + idx] = matrix[end - idx][start];

            // write bottom value to right
            matrix[end - idx][start] = matrix[end][end - idx];

            // write right value to bottom
            matrix[end][end - idx] = matrix[start + idx][end];

            // write top value to right
            matrix[start + idx][end] = temp;
        }
        start++;
        end--;
    }
}
