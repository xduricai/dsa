// LC 3439 (https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-i)

export function maxFreeTime(
    eventTime: number,
    k: number,
    startTime: number[],
    endTime: number[]
): number {
    const gaps = [startTime[0]];
    let left = 0;
    let curr = 0;
    let res = 0;

    for (let idx = 1; idx < startTime.length; idx++) {
        gaps.push(startTime[idx] - endTime[idx - 1]);
    }
    gaps.push(eventTime - endTime.at(-1));

    for (let right = 0; right < gaps.length; right++) {
        curr += gaps[right];

        if (right - left > k) {
            curr -= gaps[left];
            left++;
        }

        res = Math.max(res, curr);
    }

    return res;
}
