export function largestIsland(grid: number[][]): number {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const ROWS = grid.length;
    const COLS = grid[0].length;
    // maps island IDs onto respective island sizes
    const sizeMap = new Map<number, number>();
    // next ID to be assigned to an island
    let currentId = 2;
    let max = 0;

    const inBounds = (row: number, col: number) => {
        return row >= 0 && row < ROWS && col >= 0 && col < COLS;
    };

    const setIslandId = (row: number, col: number, id: number) => {
        // if row-col does not point to an unvisited piece of land, return
        if (!inBounds(row, col) || grid[row][col] !== 1) {
            return 0;
        }

        // set land as visited
        grid[row][col] = id;
        let res = 1;

        // recursively explore the rest of the island
        for (const [dr, dc] of DIRS) {
            const nr = row + dr;
            const nc = col + dc;
            res += setIslandId(nr, nc, id);
        }

        return res;
    };

    // get the sum of sizes of neighboring islands for a water cell
    const sumNeighbors = (row: number, col: number) => {
        const neighbors = [];
        let res = 1;

        for (const [dr, dc] of DIRS) {
            const nr = row + dr;
            const nc = col + dc;

            // make sure the same island is not added twice if it borders the cell from two sides
            if (inBounds(nr, nc) && !neighbors.includes(grid[nr][nc])) {
                neighbors.push(grid[nr][nc]);
            }
        }

        // sum the sizes of neighboring islands (or 0 if there is water)
        for (const nei of neighbors) {
            res += sizeMap.get(nei) || 0;
        }
        return res;
    };

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // get the size of an unvisited island and map it onto its ID
            if (grid[row][col] === 1) {
                const size = setIslandId(row, col, currentId);
                sizeMap.set(currentId, size);
                currentId++;
            }
        }
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // check the area sum if we flip this cell to land
            if (grid[row][col] === 0) {
                max = Math.max(max, sumNeighbors(row, col));
            }
        }
    }

    // if no water cells were found, it means the entire graph is one island
    if (max === 0) {
        return ROWS * COLS;
    }
    return max;
}
