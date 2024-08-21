import { Interval } from "./interval";

export function canAttendMeetings(intervals: Interval[]) {
    intervals.sort((a, b) => a.start - b.start);
    let prevEnd = -Infinity;

    for (const interval of intervals) {
        if (interval.start < prevEnd) {
            return false;
        }
        prevEnd = interval.end;
    }
    return true;
}
