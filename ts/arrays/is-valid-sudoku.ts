export function isValidSudoku(board: string[][]) {
    const rows = new Map<number, Set<string>>();
    const cols = new Map<number, Set<string>>();
    const squares = new Map<string, Set<string>>();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const char = board[row][col];
            if (char === ".") continue;

            let rowSet = rows.get(row);
            if (!rowSet) {
                rowSet = new Set<string>();
                rows.set(row, rowSet);
            } else if (rowSet.has(char)) return false;
            rowSet.add(char);

            let colSet = cols.get(col);
            if (!colSet) {
                colSet = new Set<string>();
                cols.set(col, colSet);
            } else if (colSet.has(char)) return false;
            colSet.add(char);

            const square = `${Math.floor(row / 3).toString()}${Math.floor(
                col / 3
            ).toString()}`;
            let sqSet = squares.get(square);
            if (!sqSet) {
                sqSet = new Set<string>();
                squares.set(square, sqSet);
            } else if (sqSet.has(char)) return false;
            sqSet.add(char);
        }
    }
    return true;
}
