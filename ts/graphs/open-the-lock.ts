export function openLock(deadends: string[], target: string): number {
    const seen = new Set<string>(deadends);
    let queue = ["0000"];
    let moves = 0;

    while (queue.length) {
        const nextQueue = [];

        for (const num of queue) {
            if (num === target) {
                return moves;
            }

            if (seen.has(num)) {
                continue;
            }
            seen.add(num);

            for (let idx = 0; idx < 4; idx++) {
                const prefix = num.slice(0, idx);
                const suffix = num.slice(idx + 1);

                const up = (parseInt(num[idx]) + 1) % 10;
                const down = (parseInt(num[idx]) + 9) % 10;

                nextQueue.push(
                    `${prefix}${up}${suffix}`,
                    `${prefix}${down}${suffix}`
                );
            }
        }

        queue = nextQueue;
        moves++;
    }
    return -1;
}
