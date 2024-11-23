// traverse every row and col twice (once each way)
export function countUnguarded(
    m: number,
    n: number,
    guards: number[][],
    walls: number[][]
): number {
    // 0 => FREE
    // 1 => GUARDED
    // 2 => GUARD
    // 3 => WALL

    const grid = Array(m)
        .fill(null)
        .map((_) => Array(n).fill(0));
    let res = 0;

    for (const [row, col] of guards) {
        grid[row][col] = 2;
    }

    for (const [row, col] of walls) {
        grid[row][col] = 3;
    }

    for (let row = 0; row < m; row++) {
        let guarded = false;

        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 2) {
                guarded = true;
                continue;
            }
            if (grid[row][col] === 3) {
                guarded = false;
                continue;
            }

            if (guarded) {
                grid[row][col] = 1;
            }
        }

        guarded = false;

        for (let col = n - 1; col >= 0; col--) {
            if (grid[row][col] === 2) {
                guarded = true;
                continue;
            }
            if (grid[row][col] === 3) {
                guarded = false;
                continue;
            }

            if (guarded) {
                grid[row][col] = 1;
            }
        }
    }

    for (let col = 0; col < n; col++) {
        let guarded = false;

        for (let row = 0; row < m; row++) {
            if (grid[row][col] === 2) {
                guarded = true;
                continue;
            }
            if (grid[row][col] === 3) {
                guarded = false;
                continue;
            }

            if (guarded) {
                grid[row][col] = 1;
            }
        }

        guarded = false;

        for (let row = m - 1; row >= 0; row--) {
            if (grid[row][col] === 2) {
                guarded = true;
                continue;
            }
            if (grid[row][col] === 3) {
                guarded = false;
                continue;
            }

            if (guarded) {
                grid[row][col] = 1;
            }
        }
    }

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 0) {
                res++;
            }
        }
    }

    return res;
}

// flood fill
export function countUnguardedAlt(
    m: number,
    n: number,
    guards: number[][],
    walls: number[][]
): number {
    // 0 => FREE
    // 1 => GUARDED ROW
    // 2 => GUARDED COL
    // 3 => GUARDED BOTH
    // 4 => GUARD
    // 5 => WALL

    const grid = Array(m)
        .fill(null)
        .map((_) => Array(n).fill(0));
    let res = 0;

    for (const [row, col] of guards) {
        grid[row][col] = 4;
    }

    for (const [row, col] of walls) {
        grid[row][col] = 5;
    }

    const floodFill = (startRow: number, startCol: number) => {
        for (let row = startRow + 1; row < m; row++) {
            if (grid[row][startCol] === 2 || grid[row][startCol] > 2) {
                break;
            }

            if (grid[row][startCol] === 1) {
                grid[row][startCol] = 3;
            } else {
                grid[row][startCol] = 2;
            }
        }

        for (let row = startRow - 1; row >= 0; row--) {
            if (grid[row][startCol] === 2 || grid[row][startCol] > 2) {
                break;
            }

            if (grid[row][startCol] === 1) {
                grid[row][startCol] = 3;
            } else {
                grid[row][startCol] = 2;
            }
        }

        for (let col = startCol + 1; col < n; col++) {
            if (grid[startRow][col] === 1 || grid[startRow][col] > 2) {
                break;
            }

            if (grid[startRow][col] === 2) {
                grid[startRow][col] = 3;
            } else {
                grid[startRow][col] = 1;
            }
        }

        for (let col = startCol - 1; col >= 0; col--) {
            if (grid[startRow][col] === 1 || grid[startRow][col] > 2) {
                break;
            }

            if (grid[startRow][col] === 2) {
                grid[startRow][col] = 3;
            } else {
                grid[startRow][col] = 1;
            }
        }
    };

    for (const [row, col] of guards) {
        floodFill(row, col);
    }

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 0) {
                res++;
            }
        }
    }

    return res;
}
