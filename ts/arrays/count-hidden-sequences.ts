// LC 2145 (https://leetcode.com/problems/count-the-hidden-sequences)

export function numberOfArrays(
    differences: number[],
    lower: number,
    upper: number
): number {
    let offset = 0;
    let min = 0;
    let max = 0;

    for (const diff of differences) {
        offset += diff;
        min = Math.min(min, offset);
        max = Math.max(max, offset);
    }

    const topBound = upper - max;
    const botBound = lower - min;
    const res = topBound - botBound + 1;

    return Math.max(res, 0);
}
