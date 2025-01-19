export function totalNQueens(n: number): number {
    const cols = new Set<number>();
    const positive = new Set<number>();
    const negative = new Set<number>();
    let count = 0;

    const backtrack = (row: number) => {
        if (row === n) {
            return 1;
        }

        let res = 0;

        for (let col = 0; col < n; col++) {
            if (
                cols.has(col) ||
                positive.has(row + col) ||
                negative.has(row - col)
            ) {
                continue;
            }

            cols.add(col);
            positive.add(row + col);
            negative.add(row - col);

            res += backtrack(row + 1);

            cols.delete(col);
            positive.delete(row + col);
            negative.delete(row - col);
        }

        return res;
    };

    return backtrack(0);
}
