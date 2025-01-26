export function maximumInvitations(favorite: number[]): number {
    const n = favorite.length;
    const seen = Array(n).fill(false);
    const len2Cycles = [];
    const inverted = new Map<number, number[]>();
    let maxCycle = 0;
    let chainSum = 0;

    // find the longest cycle
    for (let node = 0; node < n; node++) {
        if (seen[node]) {
            continue;
        }

        const cycle = new Set<number>();
        let start = node;
        let curr = node;

        while (!seen[curr]) {
            seen[curr] = true;
            cycle.add(curr);
            curr = favorite[curr];
        }

        if (cycle.has(curr)) {
            let length = cycle.size;

            while (start !== curr) {
                start = favorite[start];
                length--;
            }
            maxCycle = Math.max(maxCycle, length);

            if (length === 2) {
                len2Cycles.push([curr, favorite[curr]]);
            }
        }
    }

    // create an inverted graph
    for (let node = 0; node < n; node++) {
        const list = inverted.get(favorite[node]);

        if (list) {
            list.push(node);
        } else {
            inverted.set(favorite[node], [node]);
        }
    }

    // find the length of a path starting at a given node
    const bfs = (start: number, skip: number) => {
        let queue = [start];
        let length = 0;

        while (queue.length) {
            const nextQueue = [];

            for (const node of queue) {
                for (const nei of inverted.get(node) || []) {
                    if (nei === skip) {
                        continue;
                    }

                    nextQueue.push(nei);
                }
            }

            queue = nextQueue;
            length++;
        }
        return length;
    };

    // combine the lengths of all non-enclosed circles in the graph
    for (const [node1, node2] of len2Cycles) {
        chainSum += bfs(node1, node2) + bfs(node2, node1);
    }

    return Math.max(chainSum, maxCycle);
}
