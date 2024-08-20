export function insert(
    intervals: number[][],
    newInterval: number[]
): number[][] {
    const output = [];

    for (let idx = 0; idx < intervals.length; idx++) {
        if (newInterval[1] < intervals[idx][0]) {
            output.push(newInterval);
            return output.concat(intervals.slice(idx));
        }

        if (newInterval[0] > intervals[idx][1]) {
            output.push(intervals[idx]);
        } else {
            newInterval[0] = Math.min(newInterval[0], intervals[idx][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[idx][1]);
        }
    }

    output.push(newInterval);
    return output;
}
