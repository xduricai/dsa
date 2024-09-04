export function robotSim(commands: number[], obstacles: number[][]): number {
    const obs = new Set<string>();
    const dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    for (const [col, row] of obstacles) {
        obs.add(`${row}-${col}`);
    }

    let row = 0;
    let col = 0;
    let dir = 0;
    let max = 0;

    for (const cmd of commands) {
        if (cmd === -1) {
            dir = (dir + 1) % 4;
            continue;
        }
        if (cmd === -2) {
            dir = (dir + 3) % 4;
            continue;
        }

        for (let distance = 1; distance <= cmd; distance++) {
            const dr = row + 1 * dirs[dir][0];
            const dc = col + 1 * dirs[dir][1];

            if (obs.has(`${dr}-${dc}`)) {
                break;
            }
            row = dr;
            col = dc;
        }
        max = Math.max(max, Math.pow(row, 2) + Math.pow(col, 2));
    }
    return max;
}
