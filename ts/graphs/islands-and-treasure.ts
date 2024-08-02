export function islandsAndTreasure(grid: number[][]) {
    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
    }

    const queue = [];
    const seen = new Set<string>();
    let distance = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 0) {
                queue.push([row, col]);
            }
        }
    }

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const [row, col] = queue.shift();
            if (!inBounds(row, col) || grid[row][col] === -1 || seen.has(`${row}-${col}`)) {
                continue;
            }
            grid[row][col] = distance;
            seen.add(`${row}-${col}`);

            queue.push([row - 1, col]);
            queue.push([row, col + 1]);
            queue.push([row + 1, col]);
            queue.push([row, col - 1]);
        }
        distance++;
    }
    return grid;
}