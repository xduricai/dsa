export function maxMatrixSum(matrix: number[][]): number {
    let min = Infinity;
    let sum = 0;
    let negative = 0;

    for (const row of matrix) {
        for (const num of row) {
            if (num < 0) {
                negative++;
            }

            const abs = Math.abs(num);
            sum += abs;
            min = Math.min(min, abs);
        }
    }

    if (negative % 2 === 1) {
        sum -= min * 2;
    }
    return sum;
}
