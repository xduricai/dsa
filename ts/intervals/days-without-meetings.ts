// LC 3169 (https://leetcode.com/problems/count-days-without-meetings)

export function countDays(days: number, meetings: number[][]): number {
    meetings.sort((a, b) => a[0] - b[0]);
    const merged = [meetings[0]];
    let res = days;

    for (let idx = 1; idx < meetings.length; idx++) {
        if (meetings[idx][0] <= merged[merged.length - 1][1]) {
            merged[merged.length - 1][1] = Math.max(
                merged[merged.length - 1][1],
                meetings[idx][1]
            );
        } else {
            merged.push(meetings[idx]);
        }
    }

    for (const [start, end] of merged) {
        res -= end - start + 1;
    }

    return res;
}
