export function orangesRotting(grid: number[][]): number {
    const inBounds = (row: number, col: number) => {
        return (
            row >= 0 && col >= 0 && row < grid.length && col < grid[0].length
        );
    };
    const dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    const queue: [number, number][] = [];
    let fresh = 0;
    let time = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col] === 1) {
                fresh++;
            } else if (grid[row][col] === 2) {
                queue.push([row, col]);
            }
        }
    }

    while (queue.length && fresh) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const [r, c] = queue.shift();

            for (let [dr, dc] of dirs) {
                const row = r + dr;
                const col = c + dc;

                if (!inBounds(row, col) || grid[row][col] != 1) {
                    continue;
                }

                queue.push([row, col]);
                grid[row][col] = 2;
                fresh--;
            }
        }
        time++;
    }

    if (fresh > 0) return -1;
    return time;
}
