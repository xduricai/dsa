// LC 3440 (https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-ii)

export function maxFreeTime(
    eventTime: number,
    startTime: number[],
    endTime: number[]
): number {
    const n = startTime.length;
    const gaps = Array(n + 1);
    const durations = Array(n);

    gaps[0] = startTime[0];
    gaps[n] = eventTime - endTime.at(-1);
    durations[0] = endTime[0] - startTime[0];

    for (let idx = 1; idx < n; idx++) {
        gaps[idx] = startTime[idx] - endTime[idx - 1];
        durations[idx] = endTime[idx] - startTime[idx];
    }

    let maxLeft = 0;
    let maxRight = 0;
    let res = 0;

    for (let idx = 0; idx < n; idx++) {
        const leftGap = gaps[idx];
        const rightGap = gaps[idx + 1];
        const duration = durations[idx];

        if (maxLeft >= duration) {
            res = Math.max(res, leftGap + rightGap + duration);
        } else {
            res = Math.max(res, leftGap + rightGap);
        }

        maxLeft = Math.max(maxLeft, leftGap);
    }

    for (let idx = n - 1; idx >= 0; idx--) {
        const leftGap = gaps[idx];
        const rightGap = gaps[idx + 1];
        const duration = durations[idx];

        if (maxRight >= duration) {
            res = Math.max(res, leftGap + rightGap + duration);
        } else {
            res = Math.max(res, leftGap + rightGap);
        }

        maxRight = Math.max(maxRight, rightGap);
    }

    return res;
}
