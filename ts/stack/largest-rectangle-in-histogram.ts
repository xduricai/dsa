export function largestRectangleArea(heights: number[]) {
    if (!heights.length) return 0;
    const stack = [{ start: 0, height: heights[0] }];
    let max = heights[0];

    for (let idx = 1; idx < heights.length; idx++) {
        const current = { start: idx, height: heights[idx] };

        while (stack.length && stack[stack.length - 1].height > heights[idx]) {
            const top = stack.pop();
            current.start = top.start;
            max = Math.max(max, (idx - top.start) * top.height);
        }
        stack.push(current);
    }

    for (let item of stack) {
        max = Math.max(max, (heights.length - item.start) * item.height);
    }
    return max;
}
