export function minimizedMaximum(n: number, quantities: number[]): number {
    let left = 1;
    let right = Math.max(...quantities);
    let maxGroupSize = right;

    while (left <= right) {
        const groupSize = Math.floor((left + right) / 2);
        const groups = quantities.reduce(
            (acc, curr) => acc + Math.ceil(curr / groupSize),
            0
        );

        if (groups > n) {
            left = groupSize + 1;
        } else {
            maxGroupSize = groupSize;
            right = groupSize - 1;
        }
    }

    return maxGroupSize;
}
