export function merge(intervals: number[][]): number[][] {
    const output = [];
    intervals.sort((a, b) => a[0] - b[0]);

    for (const interval of intervals) {
        const last = output[output.length - 1];

        if (!output.length || interval[0] > last[1]) {
            output.push(interval);
        } else {
            last[1] = Math.max(last[1], interval[1]);
        }
    }
    return output;
}
