import { Interval } from "./interval";

export class MyCalendarTwo {
    single: Interval[] = [];
    double: Interval[] = [];

    book(start: number, end: number): boolean {
        for (const interval of this.double) {
            if (start < interval.end && end > interval.start) {
                return false;
            }
        }

        for (const interval of this.single) {
            if (start < interval.end && end > interval.start) {
                this.double.push({
                    start: Math.max(start, interval.start),
                    end: Math.min(end, interval.end),
                });
            }
        }
        this.single.push({ start, end });
        return true;
    }
}
