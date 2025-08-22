// LC 3195 (https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i)

export function minimumArea(grid: number[][]): number {
    const ROWS = grid.length;
    const COLS = grid[0].length;
    let left = Infinity;
    let right = -1;
    let top = Infinity;
    let bottom = -1;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col]) {
                left = Math.min(left, col);
                right = Math.max(right, col);
                top = Math.min(top, row);
                bottom = Math.max(bottom, row);
            }
        }
    }

    if (left === Infinity) {
        return 0;
    }

    return (right - left + 1) * (bottom - top + 1);
};