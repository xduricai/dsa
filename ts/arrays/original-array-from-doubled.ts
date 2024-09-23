export function findOriginalArray(changed: number[]): number[] {
    if (changed.length % 2 === 1) {
        return [];
    }

    const counts = new Map<number, number>();
    const output = [];

    for (const num of changed) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    const zeros = counts.get(0) || 0;
    if (zeros % 2 === 0) {
        counts.set(0, 0);

        for (let iter = 0; iter < zeros / 2; iter++) {
            output.push(0);
        }
    } else {
        return [];
    }
    changed.sort((a, b) => a - b);

    for (const num of changed) {
        const numCount = counts.get(num);
        const doubleCount = counts.get(num + num);

        if (numCount && doubleCount) {
            output.push(num);
            counts.set(num, numCount - 1);
            counts.set(num + num, doubleCount - 1);
        }
    }

    if (output.length !== changed.length / 2) {
        return [];
    }
    return output;
}
