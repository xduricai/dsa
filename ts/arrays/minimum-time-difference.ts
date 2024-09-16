export function findMinDifference(timePoints: string[]): number {
    const exists = Array(1440).fill(false);
    let min = 1439;
    let max = 0;

    for (const time of timePoints) {
        const [hours, minutes] = time.split(":");
        const idx = parseInt(hours) * 60 + parseInt(minutes);

        if (exists[idx]) {
            return 0;
        }
        exists[idx] = true;
        min = Math.min(min, idx);
        max = Math.max(max, idx);
    }

    let res = 1440 - (max - min); // difference between the first and last timestamp
    let previous = 0;
    let current = min;

    for (let idx = min + 1; idx <= max; idx++) {
        if (exists[idx]) {
            previous = current;
            current = idx;
            res = Math.min(res, current - previous);
        }
    }
    return res;
}
