export function mergeTriplets(triplets: number[][], target: number[]): boolean {
    const reached = new Set();

    for (const triplet of triplets) {
        if (
            triplet[0] > target[0] ||
            triplet[1] > target[1] ||
            triplet[2] > target[2]
        ) {
            continue;
        }

        for (let idx = 0; idx < 3; idx++) {
            if (triplet[idx] === target[idx]) {
                reached.add(idx);
            }
        }

        if (reached.size === 3) {
            return true;
        }
    }
    return false;
}

export function mergeTripletsAlt(
    triplets: number[][],
    target: number[]
): boolean {
    const current = [0, 0, 0];

    for (const [first, second, third] of triplets) {
        if (first > target[0] || second > target[1] || third > target[2]) {
            continue;
        }

        current[0] = Math.max(current[0], first);
        current[1] = Math.max(current[1], second);
        current[2] = Math.max(current[2], third);

        if (
            current[0] === target[0] &&
            current[1] === target[1] &&
            current[2] === target[2]
        ) {
            return true;
        }
    }
    return false;
}
