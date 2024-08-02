export function islandsAndTreasure(grid: number[][]) {
    const INF = 2147483647;
    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
    }

    const bfs = (rowStart: number, colStart: number) => {
        const queue = [[rowStart, colStart, 0]];
        const seen = new Set<string>();

        while (queue.length) {
            const [row, col, distance] = queue.shift();
            if (!inBounds(row, col) || seen.has(`${row}-${col}`) || grid[row][col] === -1) {
                continue;
            }

            if (grid[row][col] === 0) {
                return distance;
            }
            seen.add(`${row}-${col}`);

            queue.push([row - 1, col, distance + 1]);
            queue.push([row, col + 1, distance + 1]);
            queue.push([row + 1, col, distance + 1]);
            queue.push([row, col - 1, distance + 1]);
        }
        return INF;
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === INF) {
                grid[row][col] = bfs(row, col);
            }
        }
    }
    return grid;
}