export function exist(board: string[][], word: string): boolean {
    const height = board.length;
    const width = board[0].length;
    const seen = new Set();

    const inBounds = (row: number, col: number) =>
        row >= 0 && row < height && col >= 0 && col < width;

    const walk = (row: number, col: number, idx: number) => {
        if (idx === word.length) return true;
        const pos = `${row}-${col}`;

        if (
            !inBounds(row, col) ||
            board[row][col] !== word[idx] ||
            seen.has(pos)
        )
            return false;

        seen.add(pos);
        if (
            walk(row - 1, col, idx + 1) ||
            walk(row, col + 1, idx + 1) ||
            walk(row + 1, col, idx + 1) ||
            walk(row, col - 1, idx + 1)
        )
            return true;

        seen.delete(pos);
        return false;
    };

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (walk(row, col, 0)) return true;
        }
    }

    return false;
}
