export function pacificAtlantic(heights: number[][]): number[][] {
    const ROWS = heights.length;
    const COLS = heights[0].length;
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    const inBounds = (row: number, col: number) => {
        return row >= 0 && col >= 0 && row < ROWS && col < COLS;
    }

    const dfs = (r: number, c: number, tiles: Set<string>) => {
        tiles.add(`${r}-${c}`);

        for (let [dr, dc] of dirs) {
            const row = r + dr;
            const col = c + dc;

            if (inBounds(row, col) && !tiles.has(`${row}-${col}`) && heights[r][c] <= heights[row][col]) {
                dfs(row, col, tiles);
            }
        }
    }

    const atl = new Set<string>();
    const pac = new Set<string>();

    for (let col = 0; col < COLS; col++) {
        dfs(0, col, pac);
        dfs(ROWS - 1, col, atl);
    }
    for (let row = 0; row < ROWS; row++) {
        dfs(row, 0, pac);
        dfs(row, COLS - 1, atl);
    }

    const output = [];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const pos = `${row}-${col}`;

            if (atl.has(pos) && pac.has(pos)) {
                output.push([row, col]);
            }
        }
    }
    return output;
};