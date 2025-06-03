// LC 1298 (https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes)

export function maxCandies(
    status: number[],
    candies: number[],
    keys: number[][],
    containedBoxes: number[][],
    initialBoxes: number[]
): number {
    const closed = new Set<number>();
    const keySet = new Set<number>();
    let res = 0;

    const open = (box: number) => {
        closed.delete(box);
        keySet.delete(box);
        res += candies[box];

        for (const key of keys[box]) {
            keySet.add(key);
        }

        for (const contained of containedBoxes[box]) {
            if (keySet.has(contained)) {
                open(contained);
            } else {
                closed.add(contained);
            }
        }
    };

    for (const box of initialBoxes) {
        if (!status[box]) {
            closed.add(box);
            continue;
        }
        open(box);
    }

    let done = false;

    while (!done) {
        done = true;

        for (const box of closed) {
            if (keySet.has(box) || status[box]) {
                open(box);
                done = false;
            }
        }
    }

    return res;
}
