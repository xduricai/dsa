export function maxTwoEvents(events: number[][]): number {
    const times = [];
    let res = 0;
    let max = 0;

    for (const [start, end, value] of events) {
        times.push([start, value, true]);
        times.push([end + 1, value, false]);
    }

    times.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[2] - b[2]));

    for (const [time, value, isStart] of times) {
        if (isStart) {
            res = Math.max(res, max + value);
        } else {
            max = Math.max(max, value);
        }
    }

    return res;
}
