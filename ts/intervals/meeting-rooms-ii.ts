import { Interval } from "./interval";

export function minMeetingRooms(intervals: Interval[]) {
    const starts = intervals.map((i) => i.start).sort((a, b) => a - b);
    const ends = intervals.map((i) => i.end).sort((a, b) => a - b);

    let max = 0;
    let count = 0;
    let sIdx = 0;
    let eIdx = 0;

    while (sIdx < starts.length) {
        if (starts[sIdx] < ends[eIdx]) {
            sIdx++;
            count++;
            max = Math.max(max, count);
        } else {
            eIdx++;
            count--;
        }
    }
    return max;
}
