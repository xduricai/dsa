export function findMissingAndRepeatedValues(grid: number[][]): number[] {
    const n = grid.length;
    const square = n * n;
    const seen = Array(square + 1).fill(false);
    let a = -1;
    let b = -1;

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (!seen[grid[row][col]]) {
                seen[grid[row][col]] = true;
            } else {
                a = grid[row][col];
            }
        }
    }

    for (let idx = 1; idx <= square; idx++) {
        if (!seen[idx]) {
            b = idx;
            break;
        }
    }

    return [a, b];
}
