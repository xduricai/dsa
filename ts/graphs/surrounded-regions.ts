export function solve(board: string[][]): void {
    const ROWS = board.length;
    const COLS = board[0].length;

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < ROWS && col < COLS;
    };

    const dfs = (row: number, col: number) => {
        if (!inBounds(row, col) || board[row][col] !== "Y") {
            return;
        }

        board[row][col] = "O";
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row + 1, col);
        dfs(row, col - 1);
    };

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] === "O") {
                board[row][col] = "Y";
            }
        }
    }

    for (let row = 0; row < ROWS; row++) {
        if (board[row][0] === "Y") {
            dfs(row, 0);
        }
        if (board[row][COLS - 1]) {
            dfs(row, COLS - 1);
        }
    }

    for (let col = 0; col < COLS; col++) {
        if (board[0][col] === "Y") {
            dfs(0, col);
        }
        if (board[ROWS - 1][col] === "Y") {
            dfs(ROWS - 1, col);
        }
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col] === "Y") {
                board[row][col] = "X";
            }
        }
    }
}
