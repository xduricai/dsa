export function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[0] - b[0]);
    let count = 0;
    let prevEnd = -Infinity;

    for (const [start, end] of intervals) {
        if (start >= prevEnd) {
            prevEnd = end;
        } else {
            prevEnd = Math.min(end, prevEnd);
            count++;
        }
    }
    return count;
}
