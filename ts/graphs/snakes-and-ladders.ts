// LC 909 (https://leetcode.com/problems/snakes-and-ladders)

export function snakesAndLadders(board: number[][]): number {
    const cells = board
        .reverse()
        .flatMap((row, idx) => (idx % 2 === 0 ? row : row.reverse()))
        .map((val) => val - 1);
    const seen = Array(cells.length).fill(false);
    const n = cells.length;
    let queue = [0];
    let rolls = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const node of queue) {
            if (node === n - 1) {
                return rolls;
            }
            if (seen[node]) {
                continue;
            }
            seen[node] = true;

            for (let next = node + 1; next <= node + 6 && node < n; next++) {
                if (cells[next] < 0) {
                    nextQueue.push(next);
                } else {
                    nextQueue.push(cells[next]);
                }
            }
        }
        queue = nextQueue;
        rolls++;
    }
    return -1;
}
