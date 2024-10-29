export function maxMoves(grid: number[][]): number {
    let currentCol = new Set<number>();

    for (let row = 0; row < grid.length; row++) {
        currentCol.add(row);
    }

    for (let col = 0; col < grid[0].length - 1; col++) {
        const nextCol = new Set<number>();

        for (const row of currentCol) {
            for (let r = row - 1; r <= row + 1; r++) {
                if (
                    r >= 0 &&
                    r < grid.length &&
                    grid[row][col] < grid[r][col + 1]
                ) {
                    nextCol.add(r);
                }
            }
        }

        if (nextCol.size === 0) {
            return col;
        }
        currentCol = nextCol;
    }

    return grid[0].length - 1;
}
