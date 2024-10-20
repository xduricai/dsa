export class NumMatrix {
    prefix: number[][];

    constructor(matrix: number[][]) {
        const height = matrix.length + 1;
        const width = matrix[0].length + 1;

        this.prefix = Array(height)
            .fill(null)
            .map((_) => Array(width).fill(0));

        for (let row = 0; row < height - 1; row++) {
            for (let col = 0; col < width - 1; col++) {
                this.prefix[row + 1][col + 1] =
                    matrix[row][col] +
                    this.prefix[row][col + 1] +
                    this.prefix[row + 1][col] -
                    this.prefix[row][col];
            }
        }
        console.log(this.prefix);
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        const topSum = this.prefix[row1][col2 + 1];
        const leftSum = this.prefix[row2 + 1][col1];
        const totalSum = this.prefix[row2 + 1][col2 + 1];
        const overlapSum = this.prefix[row1][col1];

        return totalSum + overlapSum - topSum - leftSum;
    }
}
