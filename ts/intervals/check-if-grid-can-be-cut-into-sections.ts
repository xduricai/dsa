// LC 3394 (https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections)

export function checkValidCuts(n: number, rectangles: number[][]): boolean {
    const horizontal = rectangles.map((rect) => [rect[0], rect[2]]);
    const vertical = rectangles.map((rect) => [rect[1], rect[3]]);

    return canSplit(horizontal) || canSplit(vertical);
}

function canSplit(intervals: number[][]): boolean {
    intervals.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const merged = [intervals[0]];

    for (let idx = 1; idx < intervals.length; idx++) {
        if (merged[merged.length - 1][1] <= intervals[idx][0]) {
            merged.push(intervals[idx]);
        } else {
            merged[merged.length - 1][1] = Math.max(
                merged[merged.length - 1][1],
                intervals[idx][1]
            );
        }

        if (merged.length >= 3) {
            return true;
        }
    }

    return false;
}
