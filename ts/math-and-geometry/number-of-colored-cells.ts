// O(1) solution (sum of an arithmetic sequence)
export function coloredCells(n: number): number {
    return 1 + ((4 * (n - 1)) / 2) * n;
}

// suboptimal O(n) solution
export function coloredCellsAlt(n: number): number {
    let res = 1;
    let add = 4;

    for (let iter = 1; iter < n; iter++) {
        res += add;
        add += 4;
    }

    return res;
}
