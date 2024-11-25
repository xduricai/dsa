export function slidingPuzzle(board: number[][]): number {
    const TARGET = "123450";
    const DIRS = [
        [1, 3],
        [0, 2, 4],
        [1, 5],
        [0, 4],
        [1, 3, 5],
        [2, 4],
    ];

    const cache = new Set<string>();
    const queue = [board[0].concat(board[1]).join("")];
    let moves = 0;

    while (queue.length) {
        const len = queue.length;

        for (let iter = 0; iter < len; iter++) {
            const state = queue.shift();

            if (state === TARGET) {
                return moves;
            }
            if (cache.has(state)) {
                continue;
            }

            cache.add(state);
            const idx = state.indexOf("0");

            for (const newIdx of DIRS[idx]) {
                queue.push(swap(state, idx, newIdx));
            }
        }

        moves++;
    }

    return -1;
}

function swap(state: string, idx: number, idxNew: number) {
    const arr = state.split("");
    arr[idx] = arr[idxNew];
    arr[idxNew] = "0";

    return arr.join("");
}
