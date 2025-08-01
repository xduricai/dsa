// LC 118 (https://leetcode.com/problems/pascals-triangle)

export function generate(numRows: number): number[][] {
    const res = Array(numRows);
    res[0] = [1];

    for (let row = 1; row < numRows; row++) {
        res[row] = Array(row + 1);
        res[row][0] = 1;
        res[row][row] = 1;

        for (let col = 1; col < row; col++) {
            res[row][col] = res[row - 1][col - 1] + res[row - 1][col];
        }
    }

    return res;
};