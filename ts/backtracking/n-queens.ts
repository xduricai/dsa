export function solveNQueens(n: number): string[][] {
    const solutions: number[][] = [];
    const queens: number[] = [];
    const columns = new Set<number>();
    const posDiagonals = new Set<number>();
    const negDiagonals = new Set<number>();

    const backtrack = (row: number) => {
        if (row === n) {
            solutions.push([...queens]);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (
                columns.has(col) ||
                posDiagonals.has(row + col) ||
                negDiagonals.has(row - col)
            )
                continue;

            queens.push(col);
            columns.add(col);
            posDiagonals.add(row + col);
            negDiagonals.add(row - col);

            backtrack(row + 1);

            queens.pop();
            columns.delete(col);
            posDiagonals.delete(row + col);
            negDiagonals.delete(row - col);
        }
    };
    backtrack(0);

    return solutions.map((queens) =>
        queens.map((queen) => {
            let row = "";
            for (let idx = 0; idx < n; idx++) {
                if (idx === queen) row = `${row}${"Q"}`;
                else row = `${row}${"."}`;
            }
            return row;
        })
    );
}
