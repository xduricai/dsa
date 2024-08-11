export function uniquePaths(m: number, n: number): number {
    let currentRow = Array(n).fill(1);

    for (let iter = 1; iter < m; iter++) {
        const row = Array(n).fill(1);

        for (let idx = 1; idx < n; idx++) {
            row[idx] = currentRow[idx] + row[idx - 1];
        }
        currentRow = row;
    }
    return currentRow[n - 1];
}
