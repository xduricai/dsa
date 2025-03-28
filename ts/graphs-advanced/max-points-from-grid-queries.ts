// LC 2503 (https://leetcode.com/problems/maximum-number-of-points-from-grid-queries)
import { Heap } from "../heap/custom-heap";

// modified Dijkstra's algorithm
export function maxPoints(grid: number[][], queries: number[]): number[] {
    const DIRS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    const ROWS = grid.length;
    const COLS = grid[0].length;

    // value of highest query
    const max = Math.max(...queries);
    const points = Array(max + 1).fill(0);
    const seen = new Set<string>();
    const heap = new Heap<[number, number, number]>(
        (a, b) => a[0] - b[0],
        [[grid[0][0], 0, 0]]
    );

    while (heap.size && heap.peek()[0] < max) {
        const [val, row, col] = heap.pop();
        const key = `${row}-${col}`;

        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        // +1 because query value has to be strictly greater than cell value
        points[val + 1]++;

        for (const [dr, dc] of DIRS) {
            const r = row + dr;
            const c = col + dc;

            if (
                seen.has(`${r}-${c}`) ||
                r < 0 ||
                c < 0 ||
                r >= ROWS ||
                c >= COLS
            ) {
                continue;
            }
            heap.push([Math.max(val, grid[r][c]), r, c]);
        }
    }

    // points for a given query always include points for all previous queries
    for (let idx = 1; idx <= max; idx++) {
        points[idx] += points[idx - 1];
    }

    return queries.map((query) => points[query]);
}
